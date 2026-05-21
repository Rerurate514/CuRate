import { Result } from "../core/utils/result";
import { IDriveControllRepository } from "../domain/repositories/i_drive_controll_repository";
import { TargetEntries } from "../domain/vo/target_entries";

export class GetDriveEntriesUsecase {
    constructor(
        private readonly driveRepo: IDriveControllRepository
    ) { }
    
    async execute(targetPath: string): Promise<Result<TargetEntries>> {
        return await this.driveRepo.getTargetEntries(targetPath);
    }
}
