import * as React from 'react';

interface InputNumberIncrementProps {
    value: number;
    onChange: (value: number) => void;
}

interface InputNumberIncrementState {
    value: number;
}

export default class InputNumberIncrement extends React.Component<InputNumberIncrementProps, InputNumberIncrementState> {
    private onDecrementBound = this.onDecrement.bind(this);
    private onIncrementBound = this.onIncrement.bind(this);

    constructor(props: InputNumberIncrementProps) {
        super(props);

        this.state = { value: props.value };
    }
    render() {
        return (
            <div className='input-number-increment'>
                <button className='input-number-increment input-number-increment__button input-number-increment__button--decrement' onClick={this.onDecrementBound}>-</button>
                <input type='input' value ={this.state.value} />
                <button className='input-number-increment input-number-increment__button input-number-increment__button--increment' onClick={this.onIncrementBound}>+</button>
            </div>
        );
    }

    private onDecrement(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();

        const value = this.state.value > 0 ? this.state.value - 1 : 0;
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    private onIncrement(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();

        const value = this.state.value + 1;
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
}
