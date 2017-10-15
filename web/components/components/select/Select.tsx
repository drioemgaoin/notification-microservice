import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
    private onClickOutsideBound = this.onClickOutside.bind(this);

    constructor(props: SelectProps) {
        super(props);

        this.state = {
            value: props.value || '',
            open: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onClickOutsideBound);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutsideBound);
    }

    componentWillReceiveProps(nextProps: SelectProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
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

    private onClickOutside(e: any) {
        e.preventDefault();

        const area = ReactDOM.findDOMNode(this);
        if (!area.contains(e.target)) {
            this.setState({ open: false });
        }
    }
}
