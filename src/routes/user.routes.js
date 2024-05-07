import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { checkRole } from "../middlewares/auth.js";


const router = Router();

router.get('/:uid', UserController.getUser)

router.put('/premium/:uid', checkRole(["admin"]), UserController.changeRole)

router.get('/', UserController.getUsers)

router.delete('/', checkRole(["admin"]), UserController.deleteUsers)

router.delete('/:uid', checkRole(["admin"]), UserController.deleteUser)

export { router as userRouter}