import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getRealEstateByCategoryController,
} from "../controllers/categories.controllers";
import verifyCategoryNameMiddleware from "../middlewares/verifyCategoryName.middleware";
import verifyCategoryTokenMiddleware from "../middlewares/verifyCategoryToken.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { categoryCreationRequestSchema } from "../schemas/categories.schema";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(categoryCreationRequestSchema),
  verifyCategoryNameMiddleware,
  verifyCategoryTokenMiddleware,
  createCategoryController
); // criar uma categoria; -- apenas ADMIN
categoriesRoutes.get("", getAllCategoriesController); // listar todas as categorias; -- QUALQUER USER - SEM TOKEN
categoriesRoutes.get("/:id/realEstate", getRealEstateByCategoryController); // listar todas os imóveis que pertençam a uma categoria QUALQUER USER -- SEM TOKEN

export default categoriesRoutes;
