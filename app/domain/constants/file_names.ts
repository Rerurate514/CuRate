import * as path from "node:path";

export const BASE_CURATE_NAME = "CuRate";
export const BASE_CURATE_DIR = `${BASE_CURATE_NAME}/`;

export const DB_FILE_NAME = "curate.db";
export const BASE_DRIVE_NAME = "drive";
export const BASE_DRIVE_DIR = `${BASE_DRIVE_NAME}/`;
export const DRIVE_DIR = path.join(process.env.DRIVE_PATH!, BASE_CURATE_DIR, BASE_DRIVE_DIR);
