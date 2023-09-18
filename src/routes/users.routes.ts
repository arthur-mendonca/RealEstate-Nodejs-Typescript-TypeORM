import { Router } from "express";
import {
  updateUserController,
  createUserController,
  listAllUsersController,
  deleteUserController,
} from "../controllers/users.controllers";
import verifyUserEmailMiddleware from "../middlewares/verifyUserEmail.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import {
  userCreationRequestSchema,
  userUpdateRequestSchema,
} from "../schemas/users.schemas";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyIdMiddleware from "../middlewares/verifyId.middleware";
import verifyAdminUserMiddleware from "../middlewares/verifyAdminUser.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(userCreationRequestSchema),
  verifyUserEmailMiddleware,
  createUserController
); // criar usuário
userRoutes.get(
  "",
  verifyTokenMiddleware,
  verifyAdminUserMiddleware,
  listAllUsersController
); // listar usuários -- APENAS ADMIN
userRoutes.patch(
  "/:id",
  checkIfBodyRequestIsValidMiddleware(userUpdateRequestSchema),
  verifyIdMiddleware,
  verifyTokenMiddleware,
  updateUserController
); // editar usuário -- APENAS ADMIN ou dono da própria conta
userRoutes.delete(
  "/:id",
  verifyIdMiddleware,
  verifyTokenMiddleware,
  deleteUserController
); // soft delete usuário -- APENAS ADMIN

export default userRoutes;
