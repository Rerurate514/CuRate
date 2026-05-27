import { createRoute } from "honox/factory";
import { diMiddleware } from "../../middlewares/_di_middleware";
import { ErrorMessage } from "../../presentation/common/error_message";
import { zValidator } from "@hono/zod-validator";
import { multiUploadSchema } from "../../domain/schemas/multi_upload.schema";
import { DrivePage } from "../../presentation/drive/drive_page";
import { BASE_DRIVE_DIR, DRIVE_DIR } from "../../domain/constants/file_names";

export const GET = createRoute(diMiddleware, async (c) => {
  const path = c.req.param("path");
  const currentLocalPath = `${DRIVE_DIR}${path}`;
  const currentUrlPath = `${path}`;

  const usecase = c.get("getDriveEntriesUsecase");
  const result = await usecase.execute(currentLocalPath);

  if (!result.success || !result.value) {
    return c.render(
      <ErrorMessage
        title="Failed to Load Directory"
        message="Something went wrong while retrieving the file list. Please try again."
        buttonText="Retry"
        backTo={currentUrlPath}
      />,
    );
  }

  return c.render(
    <DrivePage
      currentPath={currentUrlPath}
      initialEntries={result.value}
    />
  );
});

export const POST = createRoute(
  diMiddleware,
  zValidator("form", multiUploadSchema, (result, c) => {
    const path = c.req.param("path");
    const currentUrlPath = `/${DRIVE_DIR}${path}`;
    if (!result.success) {
      return c.render(
        <ErrorMessage
          message="No file has been selected, or the file format is invalid."
          buttonText="Back To Drive"
          e={result.error}
          backTo={currentUrlPath}
          title="Upload Error"
        />,
      );
    }
  }),
  async (c) => {
    const path = c.req.param("path");
    const currentLocalPath = `${DRIVE_DIR}${path}`;
    const currentUrlPath = `${BASE_DRIVE_DIR}${path}`;

    const { file: files } = c.req.valid("form");

    const filesUploadUsecase = c.get("uploadFilesUsecase");
    const uploadResult = await filesUploadUsecase.execute(currentLocalPath, files);
    if (!uploadResult.success) {
      return c.render(
        <ErrorMessage
          title="Failed to Upload Files"
          message="Something went wrong while retrieving the file list. Please try again."
          buttonText="Back To Drive"
          backTo={currentUrlPath}
        />,
      );
    }

    const getEntriesUsecase = c.get("getDriveEntriesUsecase");
    const entriesResult = await getEntriesUsecase.execute(currentUrlPath);
    if (!entriesResult.success || !entriesResult.value) {
      return c.render(
        <ErrorMessage
          title="Failed to Load Directory"
          message="Something went wrong while retrieving the file list. Please try again."
          buttonText="Retry"
          backTo={currentUrlPath}
        />,
      );
    }

    return c.render(
      <DrivePage
        currentPath={currentUrlPath}
        initialEntries={entriesResult.value}
      />
    );
  },
);
