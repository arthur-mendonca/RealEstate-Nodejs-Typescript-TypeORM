import { Request, Response } from "express";
import { TuserCreationDataInterface } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: TuserCreationDataInterface = request.body;

  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

const listAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return response.status(200).json(users);
};

const updateUserController = async (request: Request, response: Response) => {
  const userId = request.params.id;
  const userData = request.body;
  const idFromToken = response.locals.id;
  const userIsAdmin = response.locals.admin;

  const user = await updateUserService(
    Number(userId),
    idFromToken,
    userData,
    userIsAdmin
  );

  return response.status(200).json(user);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idFromUser = response.locals.id;
  const userIsAdmin = response.locals.admin;

  const deleteUser = await deleteUserService(idFromUser, userIsAdmin);

  return response.status(204).send();
};

export {
  createUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
};
