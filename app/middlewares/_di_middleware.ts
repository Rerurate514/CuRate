import { createMiddleware } from "hono/factory";
import { SqliteUsersRepositoryImpl } from "../infrastructure/repositories/sqlite_users_repository_impl";
import { SetupUsecase } from "../usecases/setup_usecase";
import { CheckInitializeUsecase } from "../usecases/check_initialize_usecase";
import { LoginUsecase } from "../usecases/login_usecase";
import { SqliteSessionRepositoryImpl } from "../infrastructure/repositories/sqlite_session_repository_impl";
import { CheckValidSessionUsecase } from "./../usecases/check_valid_session_usecase";
import { LocalFileStorageRepository } from "../infrastructure/repositories/local_file_storage_repository_impl";
import { LocalDriveControllRepositoryImpl } from "../infrastructure/repositories/local_drive_controll_repository_impl";
import { GetDriveEntriesUsecase } from "../usecases/get_drive_entries_usecase";
import { LocalDirectoryRepositoryImpl } from "../infrastructure/repositories/local_directory_repository_impl";
import { UploadFilesUsecase } from "../usecases/upload_files_usecase";
import { DRIVE_DIR } from "../domain/constants/file_names";
import { DeleteFileUsecase } from "../usecases/delete_file_usecase";

export type DiEnv = {
  Variables: {
    setupUsecase: SetupUsecase;
    checkInitializeUsecase: CheckInitializeUsecase;
    loginUsecase: LoginUsecase;
    checkValidSessionUsecase: CheckValidSessionUsecase;
    getDriveEntriesUsecase: GetDriveEntriesUsecase;
    uploadFilesUsecase: UploadFilesUsecase;
    deleteFileUsecase: DeleteFileUsecase;
  };
};

const userRepo = new SqliteUsersRepositoryImpl();
const sessionRepo = new SqliteSessionRepositoryImpl();
const fileRepo = new LocalFileStorageRepository(DRIVE_DIR);
const dirRepo = new LocalDirectoryRepositoryImpl(DRIVE_DIR);
const driveRepo = new LocalDriveControllRepositoryImpl();

const setupUsecase = new SetupUsecase(userRepo);
const checkInitializeUsecase = new CheckInitializeUsecase(userRepo);
const loginUsecase = new LoginUsecase(userRepo, sessionRepo);
const checkValidSessionUsecase = new CheckValidSessionUsecase(sessionRepo);
const getDriveEntriesUsecase = new GetDriveEntriesUsecase(driveRepo);
const uploadFilesUsecase = new UploadFilesUsecase(fileRepo);
const deleteFileUsecase = new DeleteFileUsecase(fileRepo);

export const diMiddleware = createMiddleware<DiEnv>(async (c, next) => {
  c.set("setupUsecase", setupUsecase);
  c.set("checkInitializeUsecase", checkInitializeUsecase);
  c.set("loginUsecase", loginUsecase);
  c.set("checkValidSessionUsecase", checkValidSessionUsecase);
  c.set("getDriveEntriesUsecase", getDriveEntriesUsecase);
  c.set("uploadFilesUsecase", uploadFilesUsecase);
  c.set("deleteFileUsecase", deleteFileUsecase);

  await next();
});
