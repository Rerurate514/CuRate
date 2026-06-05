import { Failure, type Result } from "../core/utils/result";
import type { IDriveControllRepository } from "../domain/repositories/i_drive_controll_repository";
import type { TargetEntries } from "../domain/vo/target_entries";

export class GetDriveEntriesUsecase {
  constructor(private readonly driveRepo: IDriveControllRepository) {}

  async execute(targetPath: string): Promise<Result<TargetEntries>> {
    const existResult = await this.driveRepo.existsDriveDir();
    if (!existResult.success) return new Failure(existResult.error);
    if (!existResult.value) {
      const createResult = await this.driveRepo.createDriveDir();
      if (!createResult.success) return new Failure(createResult.error);
    }

    return await this.driveRepo.getTargetEntries(targetPath);
  }
}
