import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';
import passport from 'passport';
import { SessionController } from '../controller/session.controller.js';

const router = Router();


router.post('/register', passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}),
SessionController.register);

router.get('/failregister', SessionController.failRegister);


router.post('/login', passport.authenticate("login", {failureRedirect: '/api/sessions/faillogin'}),
SessionController.login)

router.get("/faillogin", SessionController.failLogin)

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), SessionController.loginGithubCallback)

router.get('/logout', SessionController.logout)

router.get('/current', SessionController.current)

router.post('/forgot-password', SessionController.forgotPassword)

router.post('/reset-password', SessionController.resetPassword)








export default router;