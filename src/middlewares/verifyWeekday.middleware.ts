import { NextFunction, Request, Response } from "express";
import { TScheduleCreation } from "../interfaces/schedules.interface";
import { AppError } from "../errors";

const verifyWeekdayMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const scheduleBodyRequest: TScheduleCreation = request.body;
  const { date } = scheduleBodyRequest;

  const getDay = new Date(date).getDay();

  if (getDay === 0 || getDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};
export default verifyWeekdayMiddleware;
