import * as path from "node:path";

export const DB_FILE_NAME = "curate.db";
export const BASE_DRIVE_NAME = "drive";
export const BASE_DRIVE_DIR = `${BASE_DRIVE_NAME}/`;
export const DRIVE_DIR = path.join(process.env.DRIVE_PATH!, BASE_DRIVE_DIR);
