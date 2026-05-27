import { createRoute } from "honox/factory";
import { diMiddleware } from "../../middlewares/_di_middleware";
import { ErrorMessage } from "../../presentation/common/error_message";
import { zValidator } from "@hono/zod-validator";
import { DRIVE_DIR } from "../../domain/constants/file_names";
import { multiUploadSchema } from "../../domain/schemas/multi_upload.schema";
import { DrivePage } from "../../presentation/drive/drive_page";

export const GET = createRoute(diMiddleware, async (c) => {
  const usecase = c.get("getDriveEntriesUsecase");
  const result = await usecase.execute(DRIVE_DIR);

  if (!result.success || !result.value) {
    return c.render(
      <ErrorMessage
        title="Failed to Load Directory"
        message="Something went wrong while retrieving the file list. Please try again."
        buttonText="Retry"
        backTo="/drive"
      />,
    );
  }

  return c.render(
    <DrivePage
      currentPath="/drive"
      initialEntries={result.value}
    />
  );
});

export const POST = createRoute(
  diMiddleware,
  zValidator("form", multiUploadSchema, (result, c) => {
    if (!result.success) {
      return c.render(
        <ErrorMessage
          message="No file has been selected, or the file format is invalid."
          buttonText="Back To Drive"
          e={result.error}
          backTo="/drive"
          title="Upload Error"
        ></ErrorMessage>,
      );
    }
  }),
  async (c) => {
    const { file: files } = c.req.valid("form");

    const filesUploadUsecase = c.get("uploadFilesUsecase");
    const uploadResult = await filesUploadUsecase.execute("", files);
    if (!uploadResult.success) {
      return c.render(
        <ErrorMessage
          title="Failed to Upload Files"
          message="Something went wrong while retrieving the file list. Please try again."
          buttonText="Back To Drive"
          backTo="/drive"
        />,
      );
    }

    const getEntriesUsecase = c.get("getDriveEntriesUsecase");
    const entriesResult = await getEntriesUsecase.execute(DRIVE_DIR);
    if (!entriesResult.success || !entriesResult.value) {
      return c.render(
        <ErrorMessage
          title="Failed to Load Directory"
          message="Something went wrong while retrieving the file list. Please try again."
          buttonText="Retry"
          backTo="/drive"
        />,
      );
    }

    return c.render(
      <DrivePage
        currentPath="/drive"
        initialEntries={entriesResult.value}
      ></DrivePage>
    );
  },
);
