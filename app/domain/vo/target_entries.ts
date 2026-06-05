import type { DirectoryDataEntity } from "../entities/directory_data.entity";
import type { FileDataEntity } from "../entities/file_data.entity";

export interface TargetEntries {
  directories: DirectoryDataEntity[];
  files: FileDataEntity[];
}
