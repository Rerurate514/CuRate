import * as path from "node:path";
import { mkdir, rm, stat } from "node:fs/promises";
import { FailedToCreateFileError } from "../../core/exceptions/failed_to_create_file_error";
import { FailedToDeleteFileError } from "../../core/exceptions/failed_to_delete_file_error";
import { FailedToCheckExistsFileError } from "../../core/exceptions/failed_to_check_exists_file_error";
import { ILocalDirectoryRepository } from "../../domain/repositories/i_local_directory_repository";
import { Failure, Result, Success } from "../../core/utils/result";

export class LocalDirectoryRepositoryImpl implements ILocalDirectoryRepository {
  constructor(private readonly basePath: string) {}

  async create(dirPath: string): Promise<Result<void>> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      await mkdir(fullPath, { recursive: true });
      return new Success();
    } catch (error) {
      return new Failure(new FailedToCreateFileError());
    }
  }

  async delete(dirPath: string): Promise<Result<void>> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      await rm(fullPath, { recursive: true, force: true });
      return new Success();
    } catch (error) {
      return new Failure(new FailedToDeleteFileError());
    }
  }

  async exists(dirPath: string): Promise<Result<boolean>> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      const stats = await stat(fullPath);
      return new Success(stats.isDirectory());
    } catch (error) {
      if (error instanceof Error && (error as any).code === "ENOENT") {
        return new Success(false);
      }
      return new Failure(new FailedToCheckExistsFileError());
    }
  }
}
