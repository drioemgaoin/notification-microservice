import * as React from 'react';

interface SelectProps {
    value?: string;
    options?: string[];
    onChange?: (value: any) => void;
}

interface SelectState {
    value: any;
    open: boolean;
}

export default class Select extends React.Component<SelectProps, SelectState> {
    private onOpenBound = this.onOpen.bind(this);
    private onClickBound = this.onClick.bind(this);

    constructor(props: SelectProps) {
        super(props);

        this.state = {
            value: props.value || '',
            open: false
        };
    }

    render() {
        const options = this.props.options || [];
        const modifier = this.state.open ? ' select__control--opened' : '';
        return (
            <div className='select'>
                <div className={'select__control' + modifier}>
                    <span className='select__control__input'
                        onClick={this.onOpenBound}>
                        {this.state.value}
                    </span>
                    <span className='select__control__arrow__zone'>
                        <span className='select__control__arrow'
                            onClick={this.onOpenBound} />
                    </span>
                </div>
                {
                    this.state.open &&
                    (
                        <div className='select__outer'>
                        {
                            options.map(option => {
                                return (
                                    <div className='select__outer__option'
                                        data-option={option}
                                        onClick={this.onClickBound}>
                                        {option}
                                    </div>
                                );
                            })
                        }
                        </div>
                    )
                }
            </div>
        );
    }

    private onOpen(e: React.SyntheticEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.setState({ open: !this.state.open });
    }

    private onClick(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        const value = e.currentTarget.dataset.option;
        this.setState({ value: value, open: false });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
}
