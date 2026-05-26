import { join } from "node:path";
import { Failure, Result, Success } from "../core/utils/result";
import { IFileStorageRepository } from "../domain/repositories/i_file_storage_repository";
import { DRIVE_DIR } from "../domain/constants/file_names";

export class DeleteFileUsecase {
  constructor(private readonly fileRepo: IFileStorageRepository) {}

  async execute(targetPath: string): Promise<Result<void>> {
    const fullPath = join(DRIVE_DIR, targetPath);
    const deleteResult = await this.fileRepo.delete(fullPath);
    if (!deleteResult.success) return new Failure(deleteResult.error);

    return new Success();
  }
}
