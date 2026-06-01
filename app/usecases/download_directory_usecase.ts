import { Failure, Result } from "../core/utils/result";
import { IArchiveRepository } from "../domain/repositories/i_archive_repository";

export class DownloadDirectoryUsecase {
    constructor(
        private readonly archiveRepo: IArchiveRepository
    ) {}

    async execute(targetPath: string): Promise<Result<ReadableStream>> {
        const result = await this.archiveRepo.archiveDirectory(targetPath);
        if(!result.success) return new Failure(result.error);

        return result;
    }
}
