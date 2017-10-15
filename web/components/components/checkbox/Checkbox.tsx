import * as React from 'react';
import * as bem from 'bem-classname';

interface CheckboxProps {
    label?: string;
}

interface CheckboxState {
    ticked: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    private onClickBound = this.onClick.bind(this);

    constructor(props: CheckboxProps) {
        super(props);

        this.state = {
            ticked: false
        };
    }

    render() {
        const switchClassName = bem('checkbox__toggle__switch', { 'ticked': this.state.ticked });
        const trackClassName = bem('checkbox__toggle__track', { 'ticked': this.state.ticked });
        
        return (
                <div className='checkbox'>
                    {this.props.label && (<div className='checkbox__label'>{this.props.label}</div>)}
                    <span className='checkbox__toggle' onClick={this.onClickBound}>
                        <span className={switchClassName}></span>
                        <span className={trackClassName}></span>
                    </span>
                </div>
        );
    }

    private onClick(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        this.setState({ ticked: !this.state.ticked });
    }
}
