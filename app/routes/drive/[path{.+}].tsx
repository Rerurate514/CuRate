import { createRoute } from "honox/factory";
import { diMiddleware } from "../../middlewares/_di_middleware";
import { ErrorMessage } from "../../presentation/common/error_message";
import { zValidator } from "@hono/zod-validator";
import { BASE_DRIVE_NAME, DRIVE_DIR } from "../../domain/constants/file_names";
import { multiUploadSchema } from "../../domain/schemas/multi_upload.schema";
import { DrivePage } from "../../presentation/drive/drive_page";

export const GET = createRoute(diMiddleware, async (c) => {
  const path = c.req.param("path");
  const targetPath = `${DRIVE_DIR}/${path}`;
  const currentPath = `/${BASE_DRIVE_NAME}/${path}`;

  const usecase = c.get("getDriveEntriesUsecase");
  const result = await usecase.execute(targetPath);

  if (!result.success || !result.value) {
    return c.render(
      <ErrorMessage
        title="Failed to Load Directory"
        message="Something went wrong while retrieving the file list. Please try again."
        buttonText="Retry"
        backTo={`/${BASE_DRIVE_NAME}`}
      />,
    );
  }

  return c.render(
    <DrivePage
      currentPath={currentPath}
      initialEntries={result.value}
    />
  );
});

export const POST = createRoute(
  diMiddleware,
  zValidator("form", multiUploadSchema, (result, c) => {
    if (!result.success) {
      const dir = c.req.param("path");
      return c.render(
        <ErrorMessage
          message="No file has been selected, or the file format is invalid."
          buttonText="Back To Drive"
          e={result.error}
          backTo={`/${BASE_DRIVE_NAME}/${dir}`}
          title="Upload Error"
        ></ErrorMessage>,
      );
    }
  }),
  async (c) => {
    const path = c.req.param("path");
    const targetPath = `${DRIVE_DIR}/${path}`;
    const currentPath = `/${BASE_DRIVE_NAME}/${path}`;

    const { file: files } = c.req.valid("form");

    const filesUploadUsecase = c.get("uploadFilesUsecase");
    const uploadResult = await filesUploadUsecase.execute(`${path}`, files);
    if (!uploadResult.success) {
      return c.render(
        <ErrorMessage
          title="Failed to Upload Files"
          message="Something went wrong while retrieving the file list. Please try again."
          buttonText="Back To Drive"
          backTo={currentPath}
        />,
      );
    }

    const getEntriesUsecase = c.get("getDriveEntriesUsecase");
    const entriesResult = await getEntriesUsecase.execute(targetPath);
    if (!entriesResult.success || !entriesResult.value) {
      return c.render(
        <ErrorMessage
          title="Failed to Load Directory"
          message="Something went wrong while retrieving the file list. Please try again."
          buttonText="Retry"
          backTo={currentPath}
        />,
      );
    }

    return c.render(
      <DrivePage
        currentPath={currentPath}
        initialEntries={entriesResult.value}
      ></DrivePage>
    );
  },
);
