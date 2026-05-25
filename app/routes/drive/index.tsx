import { createRoute } from "honox/factory";
import { diMiddleware } from "../../middlewares/_di_middleware";
import { DRIVE_DIR } from "../../domain/constants/file_names";
import { FileExplorer } from "../../presentation/drive/file_explorer";
import { ErrorMessage } from "../../presentation/common/error_message";
import FilePicker from "../../islands/file_picker";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const multiUploadSchema = z.object({
  file: z
    .preprocess(
      (val) => (Array.isArray(val) ? val : val ? [val] : []),
      z.array(z.instanceof(File)),
    )
    .refine((files) => files.length > 0, {
      message: "Please select at least one file",
    }),
});

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
    <div>
      <FileExplorer entries={result.value}></FileExplorer>
      <FilePicker path="/drive"></FilePicker>
    </div>,
  );
});

export const POST = createRoute(
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

    return c.text(`The upload of ${files.length} files was successful.`);
  },
);
