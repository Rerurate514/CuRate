import { NoFilesProvidedError } from "../core/exceptions/no_files_provided_error";
import { Failure, Result, Success } from "../core/utils/result";
import { DRIVE_DIR } from "../domain/constants/file_names";
import { IFileStorageRepository } from "../domain/repositories/i_file_storage_repository";
import path from "node:path";

export class UploadFilesUsecase {
  constructor(private readonly fileRepo: IFileStorageRepository) {}

  async execute(dirPath: string, files: File[]): Promise<Result<void>> {
    try {
      if (files.length === 0) {
        return new Failure(new NoFilesProvidedError());
      }

      for (const file of files) {
        const fileFullPath = path.join(DRIVE_DIR, dirPath, file.name);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await this.fileRepo.save(fileFullPath, buffer);

        if (!result.success) return result;
      }

      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
