import { mkdir, rm, stat } from "node:fs/promises";
import { Failure, type Result, Success } from "../../core/utils/result";
import type { IDirectoryStorageRepository } from "../../domain/repositories/i_directory_storage_repository";

export class LocalDirectoryRepositoryImpl
  implements IDirectoryStorageRepository
{
  constructor() {}

  async create(dirPath: string): Promise<Result<void>> {
    try {
      await mkdir(dirPath, { recursive: true });
      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async delete(dirPath: string): Promise<Result<void>> {
    try {
      await rm(dirPath, { recursive: true, force: true });
      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async exists(dirPath: string): Promise<Result<boolean>> {
    try {
      const stats = await stat(dirPath);
      return new Success(stats.isDirectory());
    } catch (error) {
      if (error instanceof Error && (error as any).code === "ENOENT") {
        return new Success(false);
      }
      return new Failure(error as any);
    }
  }
}
