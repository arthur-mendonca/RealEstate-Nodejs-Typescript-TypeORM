import "dotenv/config";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TLoginData } from "../../controllers/login.controllers";
import { AppError } from "../../errors";

const loginUserService = async (loginData: TLoginData): Promise<string> => {
  const useRepo: Repository<User> = AppDataSource.getRepository(User);

  const getUserData: User | null = await useRepo.findOneBy({
    email: loginData.email,
  });

  if (!getUserData) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch: boolean = await compare(
    loginData.password,
    getUserData.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = sign(
    { email: loginData.email, admin: getUserData.admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(getUserData.id),
    }
  );

  return token;
};

export default loginUserService;
