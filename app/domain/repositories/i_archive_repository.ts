import { Result } from "../../core/utils/result";

export interface IArchiveRepository {
  archiveDirectory(dirPath: string): Promise<Result<ReadableStream>>;
}
