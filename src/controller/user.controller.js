import { userService } from "../repository/index.js";
import { generateEmailToken, validatePassword } from "../utils.js";
import MailingService from "../utils/mailing.js";
import userModel from "../dao/models/user.model.js";

const mailer = new MailingService()

class UserController {
    static register = async (req, res) => {
        res.send({
            status: 'success',
            msg: 'usuario registrado'
        })
    }

    static failRegister = async (req, res) => {
        req.logger.error("Fallo el registro");
        res.send(`<div>Error al registrar al usuario, <a href="/signup">Intente de nuevo</a></div>`);
    }

    static login = async (req, res) => {
        if (!req.user) {
            return res.status(400).send({ status: "error" })
        }
        req.session.user = {
            full_name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email
        }
        res.send({
            status: "success",
            paylaod: req.user
        })
    }

    static failLogin = (req, res) => {
        req.logger.error("Fallo el login");
        res.send(`<div>Error al loguear al usuario, <a href="/login">Intente de nuevo</a></div>`);
    }

    static loginGithubCallback = async (req, res) => {
        req.session.user = {
            full_name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email
        }
        res.redirect("/")
    }

    static logout = async (req, res) => {
        req.session.destroy(err => {
            if (err) {
                req.logger.error(err);
                return res.status(500).send({
                    status: 'error',
                    error: 'No se pudo procesar'
                });
            }
            res.redirect('/login');
        })
    }

    static current = async (req, res) => {
        if (!req.session.user) {
            return res.status(400).send({ status: "error" })
        }
        let user = {
            full_name: req.session.user.full_name,
            email: req.session.user.email
        }

        let userDtoFront = await userService.getUserDto(user)

        res.send({
            status: "success",
            paylaod: userDtoFront
        })
    }

    static forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await userModel.findOne({email});
            console.log("AASDASDASDSADobject");
            if (!user) {
                res.send(`<div>Error no existe el usuario, vuelva a intentar: <a href="/forgot-password">Intente de nuevo</a></div>`)
            }
            console.log(user);

            const token = generateEmailToken(email, 10);
            console.log(token);
            await mailer.sendMailRecoveryPass(email, token);
            res.send("Se envio el correo de recuperacion.")

        } catch (error) {

            res.send(`<div>Error,<a href="/forgot-password">Intente de nuevo</a></div>`)
        }

    }

    static resetPassword = async (req,res)=>{
        try {
            const token = req.query.token;
    
            const {email, newPassword} = req.body;
    
            const validToken = verifyEmailToken(token);
    
            if(!validToken){
                return res.send(`El token ya no es valido`);
            }
            const user = await userService.getBy({email});
    
            if(!user){
                return res.send("el Usuario no esta registrado")   
            }
    
            if(validatePassword(newPassword,user)){
                return res.send("no se puede usar la misma contraseña")
            }
            const userData = {
                ...user._doc,
                password:createHash(newPassword)
            }
            const updateUser = await userService.updateUser(user._doc._id, userData);
    
            res.render("login", {message:"Contraseña actualizada"})
    
        } catch (error) {
            console.log(error);
            res.send(`<div>Error, hable con el administrador.</div>`)
        }
    
    };
}

export { UserController }