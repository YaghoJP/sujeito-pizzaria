import { Router } from "express";

//Importações dos controllers
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const userController = new UserController();
router.post('/user', userController.create.bind(userController))
router.post('/session', userController.auth.bind(userController))
router.get('/me', isAuthenticated, userController.detail.bind(userController))

export {router};