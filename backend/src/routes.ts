import { Router } from "express";

//Importações dos controllers
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
router.post('/user', userController.create.bind(userController))
router.post('/session', userController.auth.bind(userController))

export {router};