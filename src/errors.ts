import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err.message);

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErrors };
