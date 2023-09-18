import { Repository } from "typeorm";
import { User } from "../../entities/index";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const deleteUserService = async (
  id: number,
  userIsAdmin: boolean
): Promise<void> => {
  if (!userIsAdmin) {
    throw new AppError("Insufficient permission", 403);
  }
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const getUserToDelete = await userRepo.findOneBy({ id: id });

  await userRepo.softRemove(getUserToDelete!);
};

export default deleteUserService;
