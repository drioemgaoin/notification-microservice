import * as Mailer from 'nodemailer';

const send = (mailOptions: any) => {
    const transporter = Mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: %s', info.messageId);
    });
};

export {
    send
}