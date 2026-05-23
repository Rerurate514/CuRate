import { Result } from "../../core/utils/result";

export interface ILocalDirectoryRepository {
    create(dirPath: string): Promise<Result<void>>;
    delete(dirPath: string): Promise<Result<void>>;
    exists(dirPath: string): Promise<Result<boolean>>;
}
