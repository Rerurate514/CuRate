import { Result } from "../../core/utils/result";

export interface FileStorageOptions {
  useBaseDir?: boolean;
}

export interface IFileStorageRepository {
  save(
    path: string,
    data: Buffer | string,
    options?: FileStorageOptions,
  ): Promise<Result<void>>;
  read(path: string, options?: FileStorageOptions): Promise<Result<Buffer>>;
  delete(path: string, options?: FileStorageOptions): Promise<Result<void>>;
  exists(path: string, options?: FileStorageOptions): Promise<Result<boolean>>;
}
