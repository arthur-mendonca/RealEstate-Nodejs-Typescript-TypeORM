import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyIdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId = request.params.id;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findUserById = await userRepo.findOne({
    where: { id: +userId },
  });

  if (!findUserById) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyIdMiddleware;
