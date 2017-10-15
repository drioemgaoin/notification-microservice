import * as React from 'react';

import BorderProperties from './components/border/BorderProperties';

interface StylePanelProps {

}

interface StylePanelState {

}

export default class StylePanel extends React.Component<StylePanelProps, StylePanelState> {
    render() {
        return (
            <div className='style-panel'>
                <BorderProperties />
            </div>
        );
    }
}
