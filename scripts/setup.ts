import { EnvConfigRepositoryImpl } from "../app/infrastructure/repositories/env_config_repository_impl";

const main = async () => {
  console.log("=== CuRate Environment Setup ===");

  if (process.env.DRIVE_PATH) {
    console.log(`[Info] DRIVE_PATH is already set: ${process.env.DRIVE_PATH}`);
    console.log("No setup needed.");
    return;
  }

  const envRepo = new EnvConfigRepositoryImpl();

  console.log("Resolving default drive path for your OS...");
  const resolveResult = envRepo.resolveDrivePath();

  if (!resolveResult.success) {
    console.error("Failed to resolve default drive path:", resolveResult.error);
    process.exit(1);
  }

  console.log("Generating .env file...");
  const saveResult = await envRepo.saveDrivePath();

  if (saveResult.success) {
    console.log("Successfully generated .env file!");
    console.log("Setup completed.");
  } else {
    console.error("Failed to save .env file:", saveResult.error);
    process.exit(1);
  }
};

main();
