import { Failure, Result, Success } from "../core/utils/result";
import { IFileStorageRepository } from "../domain/repositories/i_file_storage_repository";

export class DownloadFileUsecase {
  constructor(private readonly fileRepo: IFileStorageRepository) {}

  async execute(targetPath: string): Promise<Result<Buffer>> {
    const readResult = await this.fileRepo.read(targetPath);

    if (!readResult.success) return new Failure(readResult.error);

    return new Success(readResult.value);
  }
}
