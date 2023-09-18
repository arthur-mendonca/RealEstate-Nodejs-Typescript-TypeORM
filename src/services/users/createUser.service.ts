import { Repository } from "typeorm";
import {
  TuserCreationDataInterface,
  TuserCreationResponse,
} from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userCreationResponseSchema } from "../../schemas/users.schemas";

const createUserService = async (
  userData: TuserCreationDataInterface
): Promise<TuserCreationResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const createUser: User = userRepo.create(userData);
  await userRepo.save(createUser);

  const parsedUser = userCreationResponseSchema.parse(createUser);

  return parsedUser;
};

export { createUserService };
