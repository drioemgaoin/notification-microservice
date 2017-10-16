import * as React from 'react';

import BorderProperties from './components/border/BorderProperties';

interface StylePanelProps {
    onChange: (style: any) => void;
}

interface StylePanelState {
    style: any;
}

export default class StylePanel extends React.Component<StylePanelProps, StylePanelState> {
    private onBorderChangeBound = this.onBorderChange.bind(this);

    constructor(props: StylePanelProps) {
        super(props);

        this.state = { style: {} };
    }

    render() {
        return (
            <div className='style-panel'>
                <BorderProperties onChange={this.onBorderChangeBound}
                    border={this.state.style} />
            </div>
        );
    }

    private onBorderChange(border: any) {
        this.setState({ style: border });

        if (this.props.onChange) {
            this.props.onChange(border);
        }
    }
}
