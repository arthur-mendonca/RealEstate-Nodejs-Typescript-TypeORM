import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyCategoryNameMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const categoryName = request.body.name;

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepo.findOneBy({ name: categoryName });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export default verifyCategoryNameMiddleware;
