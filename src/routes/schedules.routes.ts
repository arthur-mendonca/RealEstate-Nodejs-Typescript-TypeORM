import { Router } from "express";
import {
  createSchedulesController,
  listSchedulePerRealEstateController,
} from "../controllers/schedules.controllers";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { scheduleCreationSchema } from "../schemas/schedules.schema";
import verifyExistingScheduleMiddleware from "../middlewares/verifyExistingSchedule.middleware";
import verifyUserScheduleMiddleware from "../middlewares/verifyUserSchedule.middleware";
import verifyWeekdayMiddleware from "../middlewares/verifyWeekday.middleware";
import verifyWorkingHourMiddleware from "../middlewares/verifyWorkingHour.middleware";
import verifyAdminUserMiddleware from "../middlewares/verifyAdminUser.middleware";
import verifyExistingRealEstateMiddleware from "../middlewares/verifyExistingRealEstate.middleware";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  verifyTokenMiddleware,
  checkIfBodyRequestIsValidMiddleware(scheduleCreationSchema),
  verifyExistingScheduleMiddleware,
  verifyUserScheduleMiddleware,
  verifyWeekdayMiddleware,
  verifyWorkingHourMiddleware,
  createSchedulesController
); // agenda uma visita a um imóvel
scheduleRoutes.get(
  "/realEstate/:id",
  verifyTokenMiddleware,
  verifyAdminUserMiddleware,
  verifyExistingRealEstateMiddleware,
  listSchedulePerRealEstateController
); // lista todos os agendamentos de um imóvel

export default scheduleRoutes;
