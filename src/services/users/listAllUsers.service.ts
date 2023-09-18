import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TReturnAllUsersResponseSchema } from "../../interfaces/users.interfaces";
import { userUpdateResponseShema } from "../../schemas/users.schemas";

const listAllUsersService =
  async (): Promise<TReturnAllUsersResponseSchema> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] = await userRepo.find();

    return userUpdateResponseShema.parse(users);
  };

export { listAllUsersService };
