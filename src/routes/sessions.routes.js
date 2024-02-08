import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';
import passport from 'passport';
import { UserController } from '../controller/user.controller.js';

const router = Router();


router.post('/register', passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}),
UserController.register);

router.get('/failregister', UserController.failRegister);


router.post('/login', passport.authenticate("login", {failureRedirect: '/api/sessions/faillogin'}),
UserController.login)

router.get("/faillogin", UserController.failLogin)

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), UserController.loginGithubCallback)

router.get('/logout', UserController.logout)

router.get('/current', UserController.current)








export default router;