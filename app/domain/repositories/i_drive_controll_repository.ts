import { Result } from "../../core/utils/result";
import { FileDataEntity } from "../entities/file_data.entity";
import { DirectoryDataEntity } from "../entities/directory_data.entity";

export interface TargetEntries {
    directories: DirectoryDataEntity[];
    files: FileDataEntity[];
}

export interface IDriveControllRepository {
    getTargetEntries(targetPath: string): Promise<Result<TargetEntries>>;
}
