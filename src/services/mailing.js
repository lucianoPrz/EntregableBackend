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
    sendSimpleMail = async (from, to, subject, html, attachments = []) =>{

        try {
            const result = await this.client.sendMail({
                //from: from,
                from,
                to,
                subject,
                html,
                attachments
            })
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }
}