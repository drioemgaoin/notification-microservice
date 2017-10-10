const getSchema = (context: any) => {
    return [
        {
            name: 'items',
            value: context['items'],
            component: 'list'
        }
    ]
};

export default getSchema;
