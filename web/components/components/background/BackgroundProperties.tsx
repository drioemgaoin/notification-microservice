import * as React from 'react';

import ColorPicker from '../color-picker/ColorPicker';

interface BackgroundPropertiesProps {
    background?: string;
    onChange?: (background: any) => void;
}

interface BackgroundPropertiesState {
    background: string;
}

export default class BackgroundProperties extends React.Component<BackgroundPropertiesProps, BackgroundPropertiesState> {
    private onBackgroundChangeBound = this.onBackgroundChange.bind(this);

    constructor(props: BackgroundPropertiesProps) {
        super(props);

        this.state = {
            background: props.background || 'transparent'
        };
    }

    render() {
        return (
            <div className='background-properties'>
                <div className='background-properties__title'>Background</div>
                <ColorPicker
                    value={this.state.background}
                    onChange={this.onBackgroundChangeBound} />
            </div>
        );
    }

    private onBackgroundChange(background: string) {
        this.setState({ background });

        if (this.props.onChange) {
            this.props.onChange(background);
        }
    }
}
