import { DeepPartial, Repository } from "typeorm";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TScheduleCreation } from "../../interfaces/schedules.interface";
import { AppError } from "../../errors";

const createSchedulesService = async (
  scheduleData: TScheduleCreation,
  userId: number
): Promise<object> => {
  const { realEstateId, date, hour } = scheduleData;
  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const getRealEstate = (await AppDataSource.getRepository(RealEstate)
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .where("realEstate.id = :realEstateId", { realEstateId })
    .getOne()) as DeepPartial<RealEstate> | null;

  const getUser = (await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :userId", { userId })
    .getOne()) as DeepPartial<User>;

  if (!getRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }
  if (!getUser) {
    throw new AppError("User not found", 404);
  }

  const createSchedule = scheduleRepo.create({
    date: date,
    hour: hour,
    realEstate: getRealEstate,
    user: getUser,
  });

  await scheduleRepo.save(createSchedule);

  return { message: "Schedule created" };
};

export default createSchedulesService;

// Invalid hour, available times are 8AM to 18PM
