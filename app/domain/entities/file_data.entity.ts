import type { BunFile } from "bun";

export class FileDataEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly path: string,
    public readonly size: number,
    public readonly mimeType: string,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date,
  ) {}

  static create(params: {
    name: string;
    path: string;
    size: number;
    mimeType: string;
    createdAt: Date;
    modifiedAt: Date;
  }) {
    return new FileDataEntity(
      crypto.randomUUID(),
      params.name,
      params.path,
      params.size,
      params.mimeType,
      params.createdAt,
      params.modifiedAt,
    );
  }

  static createFromBunFile(params: {
    name: string;
    path: string;
    bunFile: BunFile;
  }) {
    const mimeType = params.bunFile.type || "application/octet-stream";
    const modifiedAt = new Date(params.bunFile.lastModified ?? Date.now());

    return new FileDataEntity(
      crypto.randomUUID(),
      params.name,
      params.path,
      params.bunFile.size,
      mimeType,
      modifiedAt,
      modifiedAt,
    );
  }
}
