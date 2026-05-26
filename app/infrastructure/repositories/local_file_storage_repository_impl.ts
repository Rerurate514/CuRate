import * as path from "node:path";
import { mkdir } from "node:fs/promises";
import { Failure, Result, Success } from "../../core/utils/result";
import { IFileStorageRepository } from "../../domain/repositories/i_file_storage_repository";
import { FailedToReadFileError } from "../../core/exceptions/failed_to_read_file_error";

export class LocalFileStorageRepository implements IFileStorageRepository {
  async save(
    filePath: string,
    data: Buffer | string,
  ): Promise<Result<void>> {
    try {
      const dirPath = path.dirname(filePath);

      await mkdir(dirPath, { recursive: true });
      await Bun.write(filePath, data);

      return new Success(undefined);
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async read(filePath: string): Promise<Result<Buffer>> {
    try {
      const file = Bun.file(filePath);
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
      const file = Bun.file(filePath);
      const isExist = await file.exists();

      if (!isExist) return new Success(undefined);

      await file.delete();
      return new Success(undefined);
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async exists(filePath: string): Promise<Result<boolean>> {
    try {
      const file = Bun.file(filePath);
      const isExist = await file.exists();
      return new Success(isExist);
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
