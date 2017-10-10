import * as React from 'react';

export default class ListItems extends React.Component<any, any> {
    private onAddBound = this.add.bind(this);
    private onChangeBound = this.change.bind(this);

    constructor(props: any) {
        super(props);

        this.state = { items: props.items };
    }

    render() {
        return (
            <div className='select-items'>
                <div className='select-items__header'>
                    <input ref='item' onChange={this.onChangeBound} />
                    <button onClick={this.onAddBound}>Add</button>
                </div>
                <div className='select-items__body'>
                    {
                        this.state.items.map((item: string) => {
                            return <div key={item}>{item}</div>;
                        })
                    }
                </div>
            </div>
        );
    }

    private change(e: React.SyntheticEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({ item: e.currentTarget.value });
    }

    private add(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();

        const items = this.state.items.concat([this.state.item]);
        this.setState({ items });

        (this.refs.item as any).value = '';

        if (this.props.onChange) {
            this.props.onChange(items);
        }
    }
}
