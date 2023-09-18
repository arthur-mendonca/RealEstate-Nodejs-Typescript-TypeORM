import { Request, Response, NextFunction } from "express";
import { TuserCreationDataInterface } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";

const verifyUserEmailMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user: TuserCreationDataInterface = request.body;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const userMail = await userRepo.findOneBy({ email: user.email });

  if (userMail) {
    return response.status(409).json({
      message: "Email already exists",
    });
  }

  return next();
};

export default verifyUserEmailMiddleware;
