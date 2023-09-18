import { z } from "zod";
import { getLoggedUserSchema } from "../schemas/login.schemas";

type TGetLoggedUser = z.infer<typeof getLoggedUserSchema>;

export { TGetLoggedUser };
