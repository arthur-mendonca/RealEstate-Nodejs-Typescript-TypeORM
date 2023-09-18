import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Schedule } from "../entities";
import { AppDataSource } from "../data-source";
import { TScheduleCreation } from "../interfaces/schedules.interface";
import { AppError } from "../errors";

const verifyExistingScheduleMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const requestData: TScheduleCreation = request.body;
  const { date, hour, realEstateId } = requestData;

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const existingSchedule = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getOne();

  if (existingSchedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};

export default verifyExistingScheduleMiddleware;
