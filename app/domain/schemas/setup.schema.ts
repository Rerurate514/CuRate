import z from "zod";

export const setupSchema = z.object({
  username: z.string().min(1, "Please Enter User name"),
  password: z.string().min(1, "Please Enter Password"),
});
