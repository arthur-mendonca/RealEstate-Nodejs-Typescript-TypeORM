import { z } from "zod";
import {
  categoryCreationRequestSchema,
  categoryCreationResponseSchema,
} from "../schemas/categories.schema";

type TCategoryCreationRequestSchema = z.infer<
  typeof categoryCreationRequestSchema
>;

type TCategoryCreationResponseSchema = z.infer<
  typeof categoryCreationResponseSchema
>;

export { TCategoryCreationRequestSchema, TCategoryCreationResponseSchema };
