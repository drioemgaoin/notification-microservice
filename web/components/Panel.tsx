import * as React from 'react';

export interface IPanelProps {
    opened: boolean;
}

export interface IPanelState {
}

export default class Panel extends React.Component<IPanelProps, IPanelState> {
    render() {
        return this.props.opened ? (
            <div className='Panel'>
                {this.props.children}
            </div>
        ) : null;
    }
}
