import { Stats } from "node:fs";
import { FileDataEntity } from "./file_data.entity";

export class DirectoryDataEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly path: string,
        public readonly subDirectories: DirectoryDataEntity[],
        public readonly files: FileDataEntity[],
        public readonly createdAt: Date,
        public readonly modifiedAt: Date
    ) {}

    static create(params: {
        name: string;
        path: string;
        createdAt: Date;
        modifiedAt: Date;
        subDirectories?: DirectoryDataEntity[];
        files?: FileDataEntity[];
    }) {
        return new DirectoryDataEntity(
            crypto.randomUUID(),
            params.name,
            params.path,
            params.subDirectories ?? [],
            params.files ?? [],
            params.createdAt,
            params.modifiedAt
        );
    }

    static createFromFs(params: {
        name: string;
        path: string;
        stats: Stats;
        subDirectories?: DirectoryDataEntity[];
        files?: FileDataEntity[];
    }) {
        return new DirectoryDataEntity(
            crypto.randomUUID(),
            params.name,
            params.path,
            params.subDirectories ?? [],
            params.files ?? [],
            params.stats.birthtime,
            params.stats.mtime
        );
    }
}
