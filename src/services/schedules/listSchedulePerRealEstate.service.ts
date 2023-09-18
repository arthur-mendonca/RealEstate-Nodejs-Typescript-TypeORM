import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const listSchedulePerRealEstateService = async (
  realEstateId: number
): Promise<RealEstate | null> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findSchedules = await realEstateRepo
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.schedules", "schedule")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .leftJoinAndSelect("schedule.user", "user")
    .where("realEstate.id = :realEstateId", { realEstateId: realEstateId })
    .getOne();

  return findSchedules;
};
export default listSchedulePerRealEstateService;
