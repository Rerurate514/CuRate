import { join } from "node:path";
import { DirectoryAlreadyExistsError } from "../core/exceptions/directory_already_exists_error";
import { Failure, Result } from "../core/utils/result";
import { IDirectoryRepository } from "../domain/repositories/i_directory_repository";
import { DRIVE_DIR } from "../domain/constants/file_names";

export class CreateDirectoryUsecase {
  constructor(private readonly dirRepo: IDirectoryRepository) {}

  async execute(dirPath: string): Promise<Result<void>> {
    const existResult = await this.dirRepo.exists(dirPath);
    if (!existResult.success) return new Failure(existResult.error);
    if (existResult.value)
      return new Failure(new DirectoryAlreadyExistsError());

    const result = await this.dirRepo.create(dirPath);
    return result;
  }
}
