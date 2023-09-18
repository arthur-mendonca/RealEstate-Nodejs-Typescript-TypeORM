import createRealEstateService from "../services/realEstate/createRealEstate.service";
import { Request, Response } from "express";
import listAllRealEstateService from "../services/realEstate/listAllRealEstate.service";

const createRealEstateController = async (
  request: Request,
  response: Response
) => {
  const requestData = request.body;

  const createNewRealEstate = await createRealEstateService(requestData);

  return response.status(201).json(createNewRealEstate);
};

const listAllRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const listRealEstates = await listAllRealEstateService();

  return response.status(200).json(listRealEstates);
};

export { createRealEstateController, listAllRealEstateController };
