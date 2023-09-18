import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyExistingRealEstateMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const RealEstateId = request.params.id;
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepo.findOne({
    where: { id: Number(RealEstateId) },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export default verifyExistingRealEstateMiddleware;
