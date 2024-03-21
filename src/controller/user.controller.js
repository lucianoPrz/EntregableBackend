import { userService } from "../repository/index.js";
import MailingService from "../services/mailing.js";

class UserController {
    static register = async (req, res) => {
        res.send({
            status: 'success',
            msg: 'usuario registrado'
        })
    }

    static failRegister = async (req, res) => {
        req.logger.error("Fallo el registro");
        res.send({ error: 'Fallo el registro' });
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
        res.send({ error: 'Fallo el login' });
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

    static resetPassword = async (req, res) => {
        const { email } = req.body;
        console.log(email);
        const mailer = new MailingService();

        const from = "NodeMailer Test";
        const to = email
        const subject = "reset password";
        const html = `<div><h1>Restablecer contraseña!</h1>
        <p>Click aqui</p>
        </div>`;

        const result = await mailer.sendSimpleMail(from, to, subject, html)
        console.log(result);

        res.send({ status: "success", message: "email enviado" })
    }
}

export { UserController }