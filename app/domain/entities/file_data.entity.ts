export class FileDataEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly path: string,
        public readonly size: number,
        public readonly mimeType: string,
        public readonly parentDirectoryId: string | null,
        public readonly createdAt: Date
    ) {}

    static create(params: {
        name: string;
        path: string;
        size: number;
        mimeType: string;
        parentDirectoryId: string | null;
    }) {
        const now = new Date();
        return new FileDataEntity(
            crypto.randomUUID(),
            params.name,
            params.path,
            params.size,
            params.mimeType,
            params.parentDirectoryId,
            now
        );
    }
}
