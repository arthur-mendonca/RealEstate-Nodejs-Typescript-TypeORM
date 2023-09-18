import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Schedule } from "../entities";
import { AppDataSource } from "../data-source";
import { TScheduleCreation } from "../interfaces/schedules.interface";
import { AppError } from "../errors";

const verifyUserScheduleMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const requestData: TScheduleCreation = request.body;
  const { date, hour, realEstateId } = requestData;
  const userId = response.locals.id;

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const userSchedule = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.user = :userId", { userId })
    .andWhere("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .getOne();

  if (userSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};

export default verifyUserScheduleMiddleware;
