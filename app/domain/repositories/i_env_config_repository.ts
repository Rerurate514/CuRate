import type { Result } from "../../core/utils/result";

export interface IEnvConfigRepository {
  resolveDrivePath(): Result<string>;
}
