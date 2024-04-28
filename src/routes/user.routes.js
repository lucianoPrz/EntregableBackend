import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router();

router.put('/premium/:uid', UserController.changeRole)

router.get('/', UserController.getUsers)

router.delete('/', UserController.deleteUsers)

export { router as userRouter}