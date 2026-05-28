import { createRoute } from "honox/factory";
import { diMiddleware } from "../../../middlewares/_di_middleware";

export const GET = createRoute(
    diMiddleware,
    async (c) => {
        const path = c.req.query("path");

        if (!path) {
            return c.json({ success: false }, 400);
        }

        const usecase = c.get("downloadFileUsecase");
        const result = await usecase.execute(path);

        if (!result.success || !result.value) {
            return c.json({ success: false }, 500);
        }

        const fileBuffer = result.value as Buffer;
        const fileName = path.split("/").pop() || "download";

        return new Response(new Uint8Array(fileBuffer), {
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${encodeURIComponent(fileName)}"`,
            },
        });
    }
)
