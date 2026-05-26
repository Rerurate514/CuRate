import { Failure, Result, Success } from "../core/utils/result";
import { IFileStorageRepository } from "../domain/repositories/i_file_storage_repository";

export class DeleteFileUsecase {
  constructor(private readonly fileRepo: IFileStorageRepository) {}

  async execute(targetPath: string): Promise<Result<void>> {
    const deleteResult = await this.fileRepo.delete(targetPath, {
      useBaseDir: false,
    });
    if (!deleteResult.success) return new Failure(deleteResult.error);

    return new Success();
  }
}
