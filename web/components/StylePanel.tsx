import * as React from 'react';
import {assign} from 'lodash';

import PaddingProperties from './components/padding/PaddingProperties';
import BorderProperties from './components/border/BorderProperties';

interface StylePanelProps {
    onChange: (style: any) => void;
    onClose?: any;
}

interface StylePanelState {
    border: any;
    padding: any;
}

export default class StylePanel extends React.Component<StylePanelProps, StylePanelState> {
    private onPaddingChangeBound = this.onPaddingChange.bind(this);
    private onBorderChangeBound = this.onBorderChange.bind(this);

    constructor(props: StylePanelProps) {
        super(props);

        this.state = {
            padding: {},
            border: {}
        };
    }

    render() {
        return (
            <div className='style-panel'>
                <div className='style-panel__header'>
                    <div className='style-panel__header__title'>Row Properties</div>
                    <span className='style-panel__header__close'
                        onClick={this.props.onClose}></span>
                </div>
                <div className='style-panel__body'>
                    <PaddingProperties onChange={this.onPaddingChangeBound} />
                    <BorderProperties onChange={this.onBorderChangeBound} />
                </div>
            </div>
        );
    }

    private onBorderChange(border: any) {
        this.setState({ border });

        if (this.props.onChange) {
            this.props.onChange(assign({}, { ...this.state.padding }, { ...border }));
        }
    }

    private onPaddingChange(padding: any) {
        this.setState({ padding });

        if (this.props.onChange) {
            this.props.onChange(assign({}, { ...this.state.border }, { ...padding }));
        }
    }
}
