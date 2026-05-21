import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { stat } from "node:fs/promises";
import { Failure, Result, Success } from "../../core/utils/result";
import { IDriveControllRepository } from "../../domain/repositories/i_drive_controll_repository";
import { DirectoryDataEntity } from '../../domain/entities/directory_data.entity';
import { FileDataEntity } from '../../domain/entities/file_data.entity';
import { TargetEntries } from './../../domain/vo/target_entries';

export class LocalDriveControllRepositoryImpl implements IDriveControllRepository {
    async getTargetEntries(targetPath: string): Promise<Result<TargetEntries>> {
        const list : TargetEntries = {
            directories: [],
            files: []
        };

        try {
            const entries = await readdir(targetPath, { withFileTypes: true });

            for(const entry of entries) {
                const path = join(targetPath, entry.name);
                const stats = await stat(targetPath);

                if(entry.isDirectory()) {
                    const dir = DirectoryDataEntity.createFromFs({
                        name: entry.name,
                        path: path,
                        stats: stats
                    });
                    list.directories.push(dir);
                } else {
                    const file = FileDataEntity.createFromFs({
                        name: entry.name,
                        path: path,
                        stats: stats,
                        bunFile: Bun.file(path)
                    })
                    list.files.push(file);
                }
            }
        } catch (e: any) {
            return new Failure(e);
        }

        return new Success(list);
    }

}
