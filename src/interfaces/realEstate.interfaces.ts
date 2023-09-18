import { z } from "zod";
import {
  createRealEstateCreationSchema,
  createRealEstateRequestSchema,
  createRealEstateResponseSchema,
} from "../schemas/realEstate.schemas";

type TCreateRealEstateRequest = z.infer<typeof createRealEstateRequestSchema>;

type TCreateRealEstateResponse = z.infer<typeof createRealEstateResponseSchema>;

type TCreateRealEstateCreation = z.infer<typeof createRealEstateCreationSchema>;

export {
  TCreateRealEstateRequest,
  TCreateRealEstateResponse,
  TCreateRealEstateCreation,
};
