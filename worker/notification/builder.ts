const build = (body: any) => {
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