import * as React from 'react';
import {assign} from 'lodash';

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
                <BorderProperties onChange={this.onBorderChangeBound}/>
            </div>
        );
    }

    private onBorderChange(border: any) {
        const style = Object.assign({ ...this.state.style }, { ...border });
        this.setState({ style });

        if (this.props.onChange) {
            this.props.onChange(style);
        }
    }
}
