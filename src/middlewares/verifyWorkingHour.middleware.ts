import { Request, Response, NextFunction } from "express";
import { TScheduleCreation } from "../interfaces/schedules.interface";
import { AppError } from "../errors";

const verifyWorkingHourMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const requestBody: TScheduleCreation = request.body;
  const { hour } = requestBody;
  const [hourNumber, hourMinute] = hour.split(":");
  const hourValue = parseInt(hourNumber);

  const date = new Date();
  date.setHours(hourValue);

  if (date.getHours() >= 18 || date.getHours() <= 8) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  return next();
};

export default verifyWorkingHourMiddleware;
