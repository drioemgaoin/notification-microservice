import * as React from 'react';

import Select from '../select/index';

interface SelectFieldProps {
    value?: string;
    label: string;
}

interface SelectFieldState {
    value: string;
}

export default class SelectField extends React.Component<SelectFieldProps, SelectFieldState> {
    constructor(props: any) {
        super(props);

        this.state = { value: props.value };
    }

    render() {
        return (
            <div className='select-properties'>
                <div className='select-properties__title'>{this.props.label}</div>
                <Select
                    value={this.state.value}
                    onChange={this.change} />
            </div>
        );
    }

    private change = (value: string) => {
        this.setState({ value });
    }
}
