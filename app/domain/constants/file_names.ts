import * as path from "node:path";

export const DB_FILE_NAME = "curate.db";
export const BASE_DRIVE_DIR = "drive/";
export const DRIVE_DIR = path.resolve(process.env.DRIVE_PATH ?? process.cwd(), BASE_DRIVE_DIR);
