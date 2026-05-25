import { Stats } from "node:fs";

export class DirectoryDataEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly path: string,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date,
  ) {}

  static create(params: {
    name: string;
    path: string;
    createdAt: Date;
    modifiedAt: Date;
  }) {
    return new DirectoryDataEntity(
      crypto.randomUUID(),
      params.name,
      params.path,
      params.createdAt,
      params.modifiedAt,
    );
  }

  static createFromFs(params: { name: string; path: string; stats: Stats }) {
    return new DirectoryDataEntity(
      crypto.randomUUID(),
      params.name,
      params.path,
      params.stats.birthtime,
      params.stats.mtime,
    );
  }
}
