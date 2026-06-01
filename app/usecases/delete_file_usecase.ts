import { Failure, type Result, Success } from "../core/utils/result";
import type { IFileStorageRepository } from "../domain/repositories/i_file_storage_repository";

export class DeleteFileUsecase {
  constructor(private readonly fileRepo: IFileStorageRepository) {}

  async execute(targetPath: string): Promise<Result<void>> {
    const deleteResult = await this.fileRepo.delete(targetPath);
    if (!deleteResult.success) return new Failure(deleteResult.error);

    return new Success();
  }
}
