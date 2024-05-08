import mailer from "nodemailer";
import { options } from "../config/config.js";


export default class MailingService {
    constructor(){
        this.client = mailer.createTransport({
            service: options.mailing.SERVICE,
            port: 587,
            auth:{
                user: options.mailing.USER,
                pass: options.mailing.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }
    sendMailRecoveryPass = async (userEmail, token) =>{

        try {

            const link = `https://entregablebackend-production.up.railway.app/reset-password?token=${token}`
            const result = await this.client.sendMail({
                //from: from,
                from: options.mailing.USER,
                to: userEmail,
                subject: "Restablecer contraseña",
                html: `
                <div>
                    <h2>Has solicitado un cambio de contraseña</h2>
                    <p>Da clic en el siguiente enlace para restablecer la contraseña</p>
                    </br>
                    <a href="${link}">
                        <button> Restablecer contraseña </button>
                    </a>
                </div>
                `
            })
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    sendMailUserDelete = async (userEmail) =>{

        try {
            const link = `https://entregablebackend-production.up.railway.app/register`
            const result = await this.client.sendMail({
                //from: from,
                from: options.mailing.USER,
                to: userEmail,
                subject: "Eliminacion de usuario",
                html: `
                <div>
                    <h2>Hemos eliminado su usuario de nuestras bases por inactividad</h2>
                    <p>Da clic en el siguiente enlace para volver a registrarse</p>
                    </br>
                    <a href="${link}">
                        <button> Registrarse nuevamente </button>
                    </a>
                </div>
                `
            })
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    sendMailPurchase = async (userEmail, ticketId) =>{

        try {
            const result = await this.client.sendMail({
                //from: from,
                from: options.mailing.USER,
                to: userEmail,
                subject: "Confirmacion de compra",
                html: `
                <div>
                    <h1>Gracias por su compra</h1>
                    <h3>El codigo de su ticket es ${ticketId}</h3>
                    </br>
                </div>
                `
            })
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    sendMailDeleteProducts = async (userEmail, title) =>{

        try {
            const result = await this.client.sendMail({
                //from: from,
                from: options.mailing.USER,
                to: userEmail,
                subject: "Aviso de eliminación de productos",
                html: `
                <div>
                    <h1>Aviso de eliminacion de productos</h1>
                    <h3>Su podructo ${title} ha sido eliminador por un administrador</h3>
                    </br>
                </div>
                `
            })
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }
}