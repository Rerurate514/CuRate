import { join } from "path";
import { Glob } from "bun";
import { IArchiveRepository } from "../../domain/repositories/i_archive_repository";
import { Failure, Result, Success } from "../../core/utils/result";
import { NotExistsFilesInDirError } from "../../core/exceptions/not_exists_files_in_dir_error";

export class BunArchiveRepository implements IArchiveRepository {
    async archiveDirectory(dirPath: string): Promise<Result<Buffer>> {
        try {
            const glob = new Glob("**/*");
            const files: { name: string; data: Uint8Array }[] = [];

            for await (const file of glob.scan({ cwd: dirPath, onlyFiles: true })) {
                const fileContent = Bun.file(join(dirPath, file));
                const arrayBuffer = await fileContent.arrayBuffer();
                files.push({
                    name: file,
                    data: new Uint8Array(arrayBuffer)
                });
            }

            if (files.length === 0) {
                return new Failure(new NotExistsFilesInDirError());
            }

            const zipBuffer = this.buildSimpleZip(files);
            return new Success(zipBuffer);
        } catch (e: any) {
            return new Failure(e);
        }
    }

    private buildSimpleZip(
        files: { name: string; data: Uint8Array }[]
    ): Buffer {
        const textEncoder = new TextEncoder();
        const chunks: Uint8Array[] = [];
        const directoryHeaders: Uint8Array[] = [];
        let currentOffset = 0;

        for (const file of files) {
            const nameBytes = textEncoder.encode(file.name);
            const fileData = file.data;
            const crc = this.computeCrc32(fileData);

            const localHeader = new Uint8Array(30 + nameBytes.length);
            const localView = new DataView(localHeader.buffer);

            localView.setUint32(0, 0x04034b50, true);
            localView.setUint16(4, 10, true);
            localView.setUint16(6, 0, true);
            localView.setUint16(8, 0, true);
            localView.setUint16(10, 0, true);
            localView.setUint16(12, 0, true);
            localView.setUint32(14, crc, true);
            localView.setUint32(18, fileData.length, true);
            localView.setUint32(22, fileData.length, true);
            localView.setUint16(26, nameBytes.length, true);
            localView.setUint16(28, 0, true);
            localHeader.set(nameBytes, 30);

            chunks.push(localHeader);
            chunks.push(fileData);

            const dirHeader = new Uint8Array(46 + nameBytes.length);
            const dirView = new DataView(dirHeader.buffer);

            dirView.setUint32(0, 0x02014b50, true);
            dirView.setUint16(4, 20, true);
            dirView.setUint16(6, 10, true);
            dirView.setUint16(8, 0, true);
            dirView.setUint16(10, 0, true);
            dirView.setUint16(12, 0, true);
            dirView.setUint16(14, 0, true);
            dirView.setUint32(16, crc, true);
            dirView.setUint32(20, fileData.length, true);
            dirView.setUint32(24, fileData.length, true);
            dirView.setUint16(28, nameBytes.length, true);
            dirView.setUint16(30, 0, true);
            dirView.setUint16(32, 0, true);
            dirView.setUint16(34, 0, true);
            dirView.setUint16(36, 0, true);
            dirView.setUint32(38, 0, true);
            dirView.setUint32(42, currentOffset, true);
            dirHeader.set(nameBytes, 46);

            directoryHeaders.push(dirHeader);
            currentOffset += localHeader.length + fileData.length;
        }

        const centralDirectoryStart = currentOffset;
        let centralDirectoryLength = 0;
        for (const dirHeader of directoryHeaders) {
            chunks.push(dirHeader);
            centralDirectoryLength += dirHeader.length;
        }

        const eocd = new Uint8Array(22);
        const eocdView = new DataView(eocd.buffer);

        eocdView.setUint32(0, 0x06054b50, true);
        eocdView.setUint16(4, 0, true);
        eocdView.setUint16(6, 0, true);
        eocdView.setUint16(8, files.length, true);
        eocdView.setUint16(10, files.length, true);
        eocdView.setUint32(12, centralDirectoryLength, true);
        eocdView.setUint32(16, centralDirectoryStart, true);
        eocdView.setUint16(20, 0, true);

        chunks.push(eocd);

        const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
        const resultBuffer = new Uint8Array(totalLength);
        let position = 0;
        for (const chunk of chunks) {
            resultBuffer.set(chunk, position);
            position += chunk.length;
        }

        return Buffer.from(resultBuffer.buffer);
    }

    private computeCrc32(data: Uint8Array): number {
        const table = new Int32Array(256);
        for (let i = 0; i < 256; i++) {
            let c = i;
            for (let j = 0; j < 8; j++) {
                c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            }
            table[i] = c;
        }
        let crc = 0 ^ -1;
        for (let i = 0; i < data.length; i++) {
            crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
        }
        return (crc ^ -1) >>> 0;
    }
}
