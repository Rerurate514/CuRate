import * as path from "node:path";

export const DB_FILE_NAME = "curate.db";
export const BASE_DRIVE_DIR = "drive/";
export const getDriveDir = (): string => {
  const basePath = process.env.DRIVE_PATH || "";
  return path.resolve(basePath, BASE_DRIVE_DIR);
};
