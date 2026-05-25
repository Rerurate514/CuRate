import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { diMiddleware } from "../../middlewares/_di_middleware";
import { EntryForm } from "../../presentation/common/entry_form";
import { ErrorMessage } from "../../presentation/common/error_message";
import { setupSchema } from "../../domain/schemas/setup.schema";

export const GET = createRoute((c) => {
  return c.render(
    <EntryForm
      pageName="Setup"
      actionPath="/auth/setup"
      buttonText="Create User"
    ></EntryForm>,
  );
});

export const POST = createRoute(
  diMiddleware,
  zValidator("form", setupSchema, (result, c) => {
    if (!result.success) {
      return c.render(
        <ErrorMessage
          message="There is an error in your input. Please check again."
          buttonText="return to setup page"
          e={result.error}
          backTo="/auth/setup"
          title="Setup Error"
        ></ErrorMessage>,
      );
    }
  }),
  async (c) => {
    const { username, password } = c.req.valid("form");

    const usecase = c.get("setupUsecase");
    const result = await usecase.execute(username, password);

    if (result.success) {
      return c.redirect("/auth/login");
    } else {
      return c.render(
        <ErrorMessage
          message="There is an error in your input. Please check again."
          buttonText="return to setup page"
          e={result.error}
          backTo="/auth/setup"
          title="Setup Error"
        ></ErrorMessage>,
      );
    }
  },
);
