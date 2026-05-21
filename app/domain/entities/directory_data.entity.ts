import { FileDataEntity } from "./file_data.entity";

export class DirectoryDataEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly path: string,
        public readonly parentDirectoryId: string | null,
        public readonly subDirectories: DirectoryDataEntity[],
        public readonly files: FileDataEntity[],
        public readonly createdAt: Date
    ) {}

    static create(params: {
        name: string;
        path: string;
        parentDirectoryId: string | null;
        subDirectories?: DirectoryDataEntity[];
        files?: FileDataEntity[];
    }) {
        const now = new Date();
        return new DirectoryDataEntity(
            crypto.randomUUID(),
            params.name,
            params.path,
            params.parentDirectoryId,
            params.subDirectories ?? [],
            params.files ?? [],
            now
        );
    }
}
