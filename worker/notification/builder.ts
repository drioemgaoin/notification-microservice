import { IMailOptions } from './model';

const build = (body: any): IMailOptions => {
    return {
        from: body.from,
        to: body.to,
        subject: body.subject,
        text: body.text,
        html: body.html
    };
};

export {
    build
}