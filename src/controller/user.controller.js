import { userService } from "../repository/index.js";

class UserController {
    static register = async(req, res) => {
        res.send({
            status: 'success',
            msg: 'usuario registrado'
        })
    }

    static failRegister = async(req, res) => {
        req.logger.error("Fallo el registro");
        res.send({ error: 'Fallo el registro' });
    }

    static login = async (req, res) => {
        if(!req.user){
            return res.status(400).send({status: "error"})
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
        req.session.destroy(err=> {
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
        if(!req.session.user) {
            return res.status(400).send({status: "error"})
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
}

export { UserController }