import * as Mailer from 'nodemailer';
import * as Promise from 'bluebird';

import { IMailOptions } from './model';

const send = (mailOptions: IMailOptions): any => {
    const transporter = Mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    return new Promise.Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                console.log('Message sent: %s', info.messageId);
                resolve();
            }
        });
    })
};

export {
    send
}