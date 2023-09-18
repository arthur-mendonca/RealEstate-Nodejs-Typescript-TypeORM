import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/index";
import {
  TUserUpdateRequestSchema,
  TuserCreationResponse,
} from "../../interfaces/users.interfaces";
import { userCreationResponseSchema } from "../../schemas/users.schemas";
import { AppError } from "../../errors";

const updateUserService = async (
  idFromRequest: number,
  idFromToken: number,
  userData: TUserUpdateRequestSchema,
  userIsAdmin: boolean
): Promise<TuserCreationResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const currentUser: User | null = await userRepo.findOneBy({
    id: idFromRequest,
  });

  if (userIsAdmin || idFromRequest === idFromToken) {
    const newUserData: User = userRepo.create({
      ...currentUser,
      ...(userData as DeepPartial<User>),
    });

    await userRepo.save(newUserData);

    const returnNewUser: TuserCreationResponse =
      userCreationResponseSchema.parse(newUserData);

    return returnNewUser;
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};

export { updateUserService };
