import type { Result } from "../../core/utils/result";
import type { TargetEntries } from "../vo/target_entries";

export interface IDriveControllRepository {
  getTargetEntries(targetPath: string): Promise<Result<TargetEntries>>;
  existsDriveDir(): Promise<Result<boolean>>;
  createDriveDir(): Promise<Result<void>>;
}
