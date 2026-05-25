import type { Result } from "../../core/utils/result";

export interface IEnvConfigRepository {
  saveDrivePath(): Promise<Result<void>>;
}
