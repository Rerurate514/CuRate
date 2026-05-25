import { DrivePathResolutionError } from "../core/exceptions/drive_path_resolution_error";
import { Failure, Result, Success } from "../core/utils/result";
import { IEnvConfigRepository } from "../domain/repositories/i_env_config_repository";

export class ResolveDrivePathEnvUsecase {
  constructor(
    private readonly envRepo: IEnvConfigRepository
  ) {}

  async execute(): Promise<Result<string>> {
    const result = this.envRepo.resolveDrivePath();

    if (!result.success) {
      return new Failure(new DrivePathResolutionError());
    }

    return new Success(result.value);
  }
}
