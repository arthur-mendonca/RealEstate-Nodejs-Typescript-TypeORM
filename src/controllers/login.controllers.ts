import { Request, Response } from "express";
import loginUserService from "../services/login/login.service";

type TLoginData = {
  email: string;
  password: string;
};

const loginUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: TLoginData = request.body;

  const token = await loginUserService(loginData);

  return response.status(200).json({ token });
};

export { TLoginData, loginUserController };
