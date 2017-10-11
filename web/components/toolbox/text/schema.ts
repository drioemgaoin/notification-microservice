const getSchema = (context: any) => {
    return [
        {
            name: 'value',
            value: context['value'],
            component: 'input'
        }
    ]
};

export default getSchema;
