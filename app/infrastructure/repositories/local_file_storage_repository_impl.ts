import * as path from "node:path";
import { mkdir } from "node:fs/promises";
import { Failure, Result, Success } from "../../core/utils/result";
import { IFileStorageRepository } from "../../domain/repositories/i_file_storage_repository";
import { FailedToReadFileError } from "../../core/exceptions/failed_to_read_file_error";

export class LocalFileStorageRepository implements IFileStorageRepository {
  constructor(private readonly basePath: string) {}

  async save(filePath: string, data: Buffer | string): Promise<Result<void>> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const dirPath = path.dirname(fullPath);

      await mkdir(dirPath, { recursive: true });
      await Bun.write(fullPath, data);

      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async read(filePath: string): Promise<Result<Buffer>> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const file = Bun.file(fullPath);
      const isExist = await file.exists();

      if (!isExist) return new Failure(new FailedToReadFileError());

      const arrayBuffer = await file.arrayBuffer();
      return new Success(Buffer.from(arrayBuffer));
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async delete(filePath: string): Promise<Result<void>> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const file = Bun.file(fullPath);
      const isExist = await file.exists();

      if (!isExist) return new Success();

      await file.delete();
      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async exists(filePath: string): Promise<Result<boolean>> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const file = Bun.file(fullPath);
      const isExist = await file.exists();
      return new Success(isExist);
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
