import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verifyAdminUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIsAdmin = res.locals.admin;
  if (!userIsAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyAdminUserMiddleware;
