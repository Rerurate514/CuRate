import * as path from "node:path";
import { mkdir } from "node:fs/promises";
import { Failure, Result, Success } from "../../core/utils/result";
import { IFileStorageRepository } from "../../domain/repositories/i_file_storage_repository";
import { FailedToCreateFileError } from "../../core/exceptions/failed_to_create_file_error";
import { FailedToReadFileError } from "../../core/exceptions/failed_to_read_file_error";
import { FailedToDeleteFileError } from "../../core/exceptions/failed_to_delete_file_error";
import { FailedToCheckExistsFileError } from "../../core/exceptions/failed_to_check_exists_file_error";

export class LocalStorageRepository implements IFileStorageRepository {
    constructor(
        private readonly basePath: string
    ) { }

    async save(filePath: string, data: Buffer | string): Promise<Result<void>> {
        try {
            const fullPath = path.join(this.basePath, filePath);
            const dirPath = path.dirname(fullPath);
            
            await mkdir(dirPath, { recursive: true });
            await Bun.write(fullPath, data);
            
            return new Success();
        } catch (error) {
            return new Failure(new FailedToCreateFileError());
        }
    }

    async read(filePath: string): Promise<Result<Buffer>> {
        try {
            const fullPath = path.join(this.basePath, filePath);
            const file = Bun.file(fullPath);
            const isExist = await file.exists();

            if (!isExist) return new Failure(new FailedToReadFileError());

            const arrayBuffer = await file.arrayBuffer();
            return new Success(Buffer.from(arrayBuffer));
        } catch (error) {
            return new Failure(new FailedToReadFileError());
        }
    }

    async delete(filePath: string): Promise<Result<void>> {
        try {
            const fullPath = path.join(this.basePath, filePath);
            const file = Bun.file(fullPath);
            const isExist = await file.exists();

            if (!isExist) return new Success();

            await file.delete();
            return new Success();
        } catch (error) {
            return new Failure(new FailedToDeleteFileError());
        }
    }

    async exists(filePath: string): Promise<Result<boolean>> {
        try {
            const fullPath = path.join(this.basePath, filePath);
            const file = Bun.file(fullPath);
            const isExist = await file.exists();
            return new Success(isExist);
        } catch (error) {
            return new Failure(new FailedToCheckExistsFileError());
        }
    }
}
