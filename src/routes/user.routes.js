import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router();

router.get('/:uid', UserController.getUser)

router.put('/premium/:uid', UserController.changeRole)

router.get('/', UserController.getUsers)

router.delete('/', UserController.deleteUsers)

router.delete('/:uid', UserController.deleteUser)

export { router as userRouter}