import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router();

router.put('/premium/:uid', UserController.changeRole)

export { router as userRouter}