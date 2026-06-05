import { DirectoryAlreadyExistsError } from "../core/exceptions/directory_already_exists_error";
import { Failure, type Result } from "../core/utils/result";
import type { IDirectoryStorageRepository } from "../domain/repositories/i_directory_storage_repository";

export class CreateDirectoryUsecase {
  constructor(private readonly dirRepo: IDirectoryStorageRepository) {}

  async execute(dirPath: string): Promise<Result<void>> {
    const existResult = await this.dirRepo.exists(dirPath);
    if (!existResult.success) return new Failure(existResult.error);
    if (existResult.value)
      return new Failure(new DirectoryAlreadyExistsError());

    const result = await this.dirRepo.create(dirPath);
    return result;
  }
}
