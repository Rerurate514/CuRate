import * as path from "node:path";
import { mkdir, rm, stat } from "node:fs/promises";
import { ILocalDirectoryRepository } from "../../domain/repositories/i_local_directory_repository";
import { Failure, Result, Success } from "../../core/utils/result";

export class LocalDirectoryRepositoryImpl implements ILocalDirectoryRepository {
  constructor(private readonly basePath: string) {}

  async create(dirPath: string): Promise<Result<void>> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      await mkdir(fullPath, { recursive: true });
      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async delete(dirPath: string): Promise<Result<void>> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      await rm(fullPath, { recursive: true, force: true });
      return new Success();
    } catch (e: any) {
      return new Failure(e);
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
      return new Failure(error as any);
    }
  }
}
