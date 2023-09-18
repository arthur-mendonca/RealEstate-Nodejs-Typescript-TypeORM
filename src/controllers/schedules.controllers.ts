import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulePerRealEstateService from "../services/schedules/listSchedulePerRealEstate.service";

const createSchedulesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestData = request.body;
  const userId = Number(response.locals.id);

  const createSchedule = await createSchedulesService(requestData, userId);

  return response.status(201).json(createSchedule);
};

const listSchedulePerRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateId = +request.params.id;

  const getSchedules = await listSchedulePerRealEstateService(realEstateId);

  return response.status(200).json(getSchedules);
};

export { createSchedulesController, listSchedulePerRealEstateController };
