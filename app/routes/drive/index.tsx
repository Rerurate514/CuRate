import { createRoute } from "honox/factory";
import { diMiddleware } from "../../middlewares/_di_middleware";
import { DRIVE_DIR } from "../../domain/constants/file_names";
import { FileExplorer } from "../../presentation/drive/file_explorer";
import { ErrorMessage } from "../../presentation/common/error_message";

export const GET = createRoute(diMiddleware, async (c) => {
    const usecase = c.get('getDriveEntriesUsecase');
    const result = await usecase.execute(DRIVE_DIR);

    if(!result.success || !result.value) {
        return c.render(
            <ErrorMessage
                title="Failed to Load Directory"
                message="Something went wrong while retrieving the file list. Please try again."
                buttonText="Retry"
                backTo="/drive"
            />
        );
    }

    return c.render(
        <FileExplorer
            entries={result.value}
        ></FileExplorer>
    );
})
