import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { stat } from "node:fs/promises";
import { Failure, Result, Success } from "../../core/utils/result";
import { IDriveControllRepository } from "../../domain/repositories/i_drive_controll_repository";
import { DirectoryDataEntity } from "../../domain/entities/directory_data.entity";
import { FileDataEntity } from "../../domain/entities/file_data.entity";
import { TargetEntries } from "./../../domain/vo/target_entries";
import { mkdir } from "node:fs/promises";
import { DRIVE_DIR } from "../../domain/constants/file_names";

export class LocalDriveControllRepositoryImpl
  implements IDriveControllRepository
{
  async getTargetEntries(targetPath: string): Promise<Result<TargetEntries>> {
    const list: TargetEntries = {
      directories: [],
      files: [],
    };

    try {
      const entries = await readdir(targetPath, { withFileTypes: true });

      for (const entry of entries) {
        const path = join(targetPath, entry.name);
        if (entry.isDirectory()) {
          const stats = await stat(targetPath);
          const dir = DirectoryDataEntity.createFromFs({
            name: entry.name,
            path: path,
            stats: stats,
          });
          list.directories.push(dir);
        } else {
          const file = FileDataEntity.createFromBunFile({
            name: entry.name,
            path: path,
            bunFile: Bun.file(path),
          });
          list.files.push(file);
        }
      }
    } catch (e: any) {
      return new Failure(e);
    }

    return new Success(list);
  }

  async existsDriveDir(): Promise<Result<boolean>> {
    try {
      const stats = await stat(DRIVE_DIR);
      return new Success(stats.isDirectory());
    } catch (e: any) {
      if (e?.code === "ENOENT") {
        return new Success(false);
      }
      return new Failure(e);
    }
  }

  async createDriveDir(): Promise<Result<void>> {
    try {
      await mkdir(DRIVE_DIR, { recursive: true });
      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
