import { IMailOptions } from './model';

const converFromRequest = (body: any): IMailOptions => {
    return {
        from: body.from,
        to: body.to,
        subject: body.subject,
        text: body.text,
        html: body.html
    };
};

const converFromDocument = (document: any): IMailOptions => {
    return {
        from: document.from,
        to: document.to,
        subject: document.subject,
        text: document.text,
        html: document.html
    };
};

export {
    converFromRequest,
    converFromDocument
}