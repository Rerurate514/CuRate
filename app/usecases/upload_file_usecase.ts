import { FileAlreadyExistsError } from "../core/exceptions/file_already_exists_error";
import { Failure, Result } from "../core/utils/result";
import { IFileStorageRepository } from "../domain/repositories/i_file_storage_repository";

export class UploadFileUsecase {
    constructor(
        private readonly fileRepo: IFileStorageRepository
    ) {}

    async execute(path: string, data: string | Buffer<ArrayBufferLike>): Promise<Result<void>> {
        const existsResult = await this.fileRepo.exists(path);
        if(!existsResult.success) return new Failure(existsResult.error);
        if(existsResult.value) return new Failure(new FileAlreadyExistsError());

        const result = await this.fileRepo.save(path, data);
        return result;
    }
}
