const getSchema = (context: any) => {
    return [
        {
            name: 'value',
            value: context['value'].format('YYYY-MM-DD'),
            component: 'date'
        },
        {
            name: 'format',
            value: context['format'],
            options: ['DD/MM/YYYY', 'DD/MM/YY'],
            component: 'select'
        }
    ]
};

export default getSchema;
