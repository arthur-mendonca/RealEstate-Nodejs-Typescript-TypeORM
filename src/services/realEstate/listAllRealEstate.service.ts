import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const listAllRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates = await realEstateRepo.find({
    relations: { address: true },
  });

  return realEstates;
};

export default listAllRealEstateService;
