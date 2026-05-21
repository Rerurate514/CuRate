import { Result } from "../../core/utils/result";
import { TargetEntries } from "../vo/target_entries";

export interface IDriveControllRepository {
    getTargetEntries(targetPath: string): Promise<Result<TargetEntries>>;
}
