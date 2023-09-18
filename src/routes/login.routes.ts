import { Router } from "express";
import { loginUserController } from "../controllers/login.controllers";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { loginRequestSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(loginRequestSchema),
  loginUserController
); // gerar token de autenticação -- QUALQUER USER - SEM TOKEN

export default loginRoutes;
