import { Stats } from "node:fs";
import { BunFile } from "bun";

export class FileDataEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly path: string,
        public readonly size: number,
        public readonly mimeType: string,
        public readonly createdAt: Date,
        public readonly modifiedAt: Date
    ) {}

    static create(params: {
        name: string;
        path: string;
        size: number;
        mimeType: string;
        createdAt: Date;
        modifiedAt: Date;
    }) {
        return new FileDataEntity(
            crypto.randomUUID(),
            params.name,
            params.path,
            params.size,
            params.mimeType,
            params.createdAt,
            params.modifiedAt
        );
    }

    static createFromFs(params: {
        name: string;
        path: string;
        stats: Stats;
        bunFile: BunFile;
    }) {
        const mimeType = params.bunFile.type || "application/octet-stream";

        return new FileDataEntity(
            crypto.randomUUID(),
            params.name,
            params.path,
            params.stats.size,
            mimeType,
            params.stats.birthtime,
            params.stats.mtime
        );
    }
}
