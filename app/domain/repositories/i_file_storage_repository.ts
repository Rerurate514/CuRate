import { Result } from "../../core/utils/result";

export interface IFileStorageRepository {
    save(path: string, data: Buffer | string): Promise<Result<void>>;
    read(path: string): Promise<Result<Buffer>>;
    delete(path: string): Promise<Result<void>>;
    exists(path: string): Promise<Result<boolean>>;
}
