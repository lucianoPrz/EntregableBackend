import { userService } from "../repository/index.js";
import { generateEmailToken, validatePassword } from "../utils.js";
import MailingService from "../utils/mailing.js";
import userModel from "../dao/models/user.model.js";
import moment from "moment";

const mailer = new MailingService()

class UserController {
    static changeRole = async (req, res) => {
        try {
            const uid = req.params.uid
            const user = await userService.getBy({_id:uid})
            if (!user) {
                return res.status(400).send({
                    status: 'error',
                    error: 'No existe el usuario'
                })
            }
            if (user.role == 'admin') {
                return res.status(400).send({
                    status: 'error',
                    error: `No se puede cambiar el rol de un administrador`
                })
             }
            
            const result = await userService.changeRole(uid)

            res.send({
                status: 'success',
                msg: `Rol actualizado`,
                payload: result
            })

        } catch (error) {
            console.log(error);
        }
    };
    static getUsers = async (req, res) => {
        try {
            const result = await userService.getUsers()
            
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }
    static getUser = async (req, res) => {
        try {
            const uid = req.params.uid
            console.log(uid);
            let user = await userService.getBy({_id: uid});
            res.send({
                status: 'success',
                payload: user
            })

        } catch (error) {
            console.log(error);
        }
    }

    static deleteUsers = async (req, res) => {
       try {
        let users = await userService.getUsersDB()
        const hoy = moment()
        const usersToDelete = []

        for (let user of users) {
            if (hoy.diff(user.lastConnection, "minutes") > 30) {
                console.log(hoy.diff(user.lastConnection, "minutes"));
                console.log(user);
                usersToDelete.push(user);
            }
        }

        for (let user of usersToDelete) {
            mailer.sendMailUserDelete(user.email)
            await userService.deleteUser(user._id);
        }

        res.send({
            status: 'success',
            msg: `Usuarios inactivos eliminados correctamente`,
        })

       } catch (error) {
            console.log(error);
       }

    }
    static deleteUser = async (req, res) => {
        try {
            let uid = req.params.uid
         let users = await userService.getById({_id: uid})
         if (!users) {
            return res.status(400).send({
                status: 'error',
                error: `No existe el usuario con id ${uid}`
            })
         }
         if (users.role == 'admin') {
            return res.status(400).send({
                status: 'error',
                error: `No se puede eliminar un usuario con rol administrador`
            })
         }
         const result = await userService.deleteUser(uid)
 
        
 
         res.send({
             status: 'success',
             msg: `Usuarios eliminados correctamente`,
         })
 
        } catch (error) {
             console.log(error);
        }
 
     }
}

export { UserController }