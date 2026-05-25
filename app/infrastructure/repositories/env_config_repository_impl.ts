import { Success, Failure, Result } from "../../core/utils/result";
import { parse } from "node:path";
import { platform, tmpdir } from "node:os";

export class EnvConfigRepositoryImpl {
    
  resolveDrivePath(): Result<string> {
    try {
      if (process.env.DRIVE_PATH) {
        return new Success(process.env.DRIVE_PATH);
      }

      if (platform() === "win32") {
        const root = parse(tmpdir()).root;
        return new Success(root || "C:\\");
      }

      return new Success("/");
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
