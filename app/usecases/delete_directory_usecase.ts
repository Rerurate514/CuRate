import { Failure, Result, Success } from "../core/utils/result";
import { IDirectoryStorageRepository } from "../domain/repositories/i_directory_storage_repository";

export class DeleteDirectoryUsecase {
  constructor(private readonly dirRepo: IDirectoryStorageRepository) {}

  async execute(targetPath: string): Promise<Result<void>> {
    const result = await this.dirRepo.delete(targetPath);
    if (!result.success) return new Failure(result.error);
    return new Success();
  }
}
