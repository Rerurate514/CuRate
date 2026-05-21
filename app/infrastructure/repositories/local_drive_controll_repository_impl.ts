import { readdir } from "node:fs/promises";
import { join } from "node:path";
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
                if(entry.isDirectory()) {
                    const dir = DirectoryDataEntity.create({
                        name: entry.name,
                        path: path,
                        parentDirectoryId: null
                    });
                    list.directories.push(dir);
                } else {
                    const fileInfo = Bun.file(path);
                    const file = FileDataEntity.create({
                        name: entry.name,
                        path: path,
                        size: fileInfo.size,
                        mimeType: fileInfo.type,
                        parentDirectoryId: null
                    });
                    list.files.push(file);
                }
            }
        } catch (e: any) {
            return new Failure(e);
        }

        return new Success(list);
    }

}
