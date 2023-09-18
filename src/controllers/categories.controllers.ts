import { Request, Response } from "express";
import { createCategoryService } from "../services/categories/createCategory.service";
import getAllCategoriesService from "../services/categories/getAllCategories.service";
import { getRealEstateByCategoryService } from "../services/categories/getRealEstateByCategory.service";

const createCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryName = request.body;
  const userIsAdmin = response.locals.admin;
  const createCategory = await createCategoryService(categoryName, userIsAdmin);

  return response.status(201).json(createCategory);
};

const getAllCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const getAllCategories = await getAllCategoriesService();

  return response.status(200).json(getAllCategories);
};

const getRealEstateByCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryId: number = Number(request.params.id);

  const getRealEstateByCategory = await getRealEstateByCategoryService(
    categoryId
  );
  return response.status(200).json(getRealEstateByCategory);
};

export {
  createCategoryController,
  getAllCategoriesController,
  getRealEstateByCategoryController,
};
