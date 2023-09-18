import { Router } from "express";
import verifyCategoryTokenMiddleware from "../middlewares/verifyCategoryToken.middleware";
import {
  createRealEstateController,
  listAllRealEstateController,
} from "../controllers/realEstate.controllers";
import verifyAdminUserMiddleware from "../middlewares/verifyAdminUser.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { createRealEstateRequestSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  verifyCategoryTokenMiddleware,
  verifyAdminUserMiddleware,
  checkIfBodyRequestIsValidMiddleware(createRealEstateRequestSchema),
  createRealEstateController
); // cria uma imóvel -- APENAS ADMIN
realEstateRoutes.get("", listAllRealEstateController); // lista todos os iméveis -- QUALUER USAR - SEM TOKEN

export default realEstateRoutes;
