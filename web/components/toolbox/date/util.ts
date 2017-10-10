const getOptions = (name: string) => {
    if (name === 'format') {
        return ['DD/MM/YYYY', 'DD/MM/YY'];
    }

    return undefined;
}

const getValue = (name: string, context: any) => {
    if (name === 'format') {
        return context[name];
    }

    return context[name].format('YYYY-MM-DD');
}

export {
    getOptions,
    getValue
}
