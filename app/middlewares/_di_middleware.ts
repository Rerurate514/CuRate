import { createMiddleware } from "hono/factory";
import { FFlateArchiveRepositoryImpl } from "../infrastructure/repositories/fflate_archive_repository_impl";
import { LocalDirectoryRepositoryImpl } from "../infrastructure/repositories/local_directory_repository_impl";
import { LocalDriveControllRepositoryImpl } from "../infrastructure/repositories/local_drive_controll_repository_impl";
import { LocalFileStorageRepository } from "../infrastructure/repositories/local_file_storage_repository_impl";
import { SqliteSessionRepositoryImpl } from "../infrastructure/repositories/sqlite_session_repository_impl";
import { SqliteUsersRepositoryImpl } from "../infrastructure/repositories/sqlite_users_repository_impl";
import { CheckInitializeUsecase } from "../usecases/check_initialize_usecase";
import { CheckValidSessionUsecase } from "./../usecases/check_valid_session_usecase";
import { CreateDirectoryUsecase } from "../usecases/create_directory_usecase";
import { DeleteDirectoryUsecase } from "../usecases/delete_directory_usecase";
import { DeleteFileUsecase } from "../usecases/delete_file_usecase";
import { DownloadDirectoryUsecase } from "../usecases/download_directory_usecase";
import { DownloadFileUsecase } from "../usecases/download_file_usecase";
import { GetDriveEntriesUsecase } from "../usecases/get_drive_entries_usecase";
import { LoginUsecase } from "../usecases/login_usecase";
import { SetupUsecase } from "../usecases/setup_usecase";
import { UploadFilesUsecase } from "../usecases/upload_files_usecase";

export type DiEnv = {
  Variables: {
    setupUsecase: SetupUsecase;
    checkInitializeUsecase: CheckInitializeUsecase;
    loginUsecase: LoginUsecase;
    checkValidSessionUsecase: CheckValidSessionUsecase;
    getDriveEntriesUsecase: GetDriveEntriesUsecase;
    uploadFilesUsecase: UploadFilesUsecase;
    deleteFileUsecase: DeleteFileUsecase;
    deleteDirectoryUsecase: DeleteDirectoryUsecase;
    createDirectoryUsecase: CreateDirectoryUsecase;
    downloadFileUsecase: DownloadFileUsecase;
    downloadDirectoryUsecase: DownloadDirectoryUsecase;
  };
};

const userRepo = new SqliteUsersRepositoryImpl();
const sessionRepo = new SqliteSessionRepositoryImpl();
const fileRepo = new LocalFileStorageRepository();
const dirRepo = new LocalDirectoryRepositoryImpl();
const driveRepo = new LocalDriveControllRepositoryImpl();
const archiveRepo = new FFlateArchiveRepositoryImpl();

const setupUsecase = new SetupUsecase(userRepo);
const checkInitializeUsecase = new CheckInitializeUsecase(userRepo);
const loginUsecase = new LoginUsecase(userRepo, sessionRepo);
const checkValidSessionUsecase = new CheckValidSessionUsecase(sessionRepo);
const getDriveEntriesUsecase = new GetDriveEntriesUsecase(driveRepo);
const uploadFilesUsecase = new UploadFilesUsecase(fileRepo);
const deleteFileUsecase = new DeleteFileUsecase(fileRepo);
const deleteDirectoryUsecase = new DeleteDirectoryUsecase(dirRepo);
const createDirectoryUsecase = new CreateDirectoryUsecase(dirRepo);
const downloadFileUsecase = new DownloadFileUsecase(fileRepo);
const downloadDirectoryUsecase = new DownloadDirectoryUsecase(archiveRepo);

export const diMiddleware = createMiddleware<DiEnv>(async (c, next) => {
  c.set("setupUsecase", setupUsecase);
  c.set("checkInitializeUsecase", checkInitializeUsecase);
  c.set("loginUsecase", loginUsecase);
  c.set("checkValidSessionUsecase", checkValidSessionUsecase);
  c.set("getDriveEntriesUsecase", getDriveEntriesUsecase);
  c.set("uploadFilesUsecase", uploadFilesUsecase);
  c.set("deleteFileUsecase", deleteFileUsecase);
  c.set("createDirectoryUsecase", createDirectoryUsecase);
  c.set("downloadFileUsecase", downloadFileUsecase);
  c.set("deleteDirectoryUsecase", deleteDirectoryUsecase);
  c.set("downloadDirectoryUsecase", downloadDirectoryUsecase);

  await next();
});
