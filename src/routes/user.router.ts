import express, { Router } from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";

const userService = new UserService();
const userController = new UserController(userService);

const userRouter: Router = express.Router();

userRouter.route('/')
.get(userController.getAllUsers.bind(userController))
.post(userController.createOneUser.bind(userController));

userRouter.route('/signup')
.post(userController.signUp.bind(userController));

userRouter.route('/:id')
.get(userController.getOneUser.bind(userController))
.patch(userController.updateOneUser.bind(userController))
.delete(userController.deleteOneUser.bind(userController));

export default userRouter;