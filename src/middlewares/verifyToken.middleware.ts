import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import "dotenv/config";

const verifyTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    response.locals.admin = decoded.admin;
    response.locals.id = decoded.sub;
  });

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const getLoggedUser = await userRepo.findOneBy({
    id: response.locals.id,
  });

  const IdNumberFromUser = getLoggedUser!.id;
  response.locals.id = IdNumberFromUser;

  return next();
};

export default verifyTokenMiddleware;
