import { Success, Failure, Result } from "../../core/utils/result";
import path from "node:path";
import os from "node:os";
import { IEnvConfigRepository } from "../../domain/repositories/i_env_config_repository";

export class EnvConfigRepositoryImpl implements IEnvConfigRepository {
  async saveDrivePath(): Promise<Result<void>> {
    try {
      const resolveDrivePathResult = this.resolveDrivePath();
      if(!resolveDrivePathResult.success) return new Failure(resolveDrivePathResult.error);

      const envPath = path.join(process.cwd(), ".env");
      const envContent = `DRIVE_PATH="${resolveDrivePathResult}"\n`;

      await Bun.write(envPath, envContent);

      process.env.DRIVE_PATH = resolveDrivePathResult.value;

      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  resolveDrivePath(): Result<string> {
    try {
      if (process.env.DRIVE_PATH) {
        return new Success(process.env.DRIVE_PATH);
      }

      const platform = os.platform();

      if (platform === "win32") {
        const tmpDir = os.tmpdir();
        const root = path.parse(tmpDir).root;
        return new Success(root || "C:\\");
      }

      return new Success("/");
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
