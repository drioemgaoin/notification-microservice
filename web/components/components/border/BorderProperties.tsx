import * as React from 'react';

import Select from '../select/Select';
import InputNumberIncrement from '../input-number/InputNumberIncrement';
import ColorPicker from '../color-picker/ColorPicker';
import Checkbox from '../checkbox/Checkbox';

interface BorderPropertiesProps {
    moreOptions?: boolean,
    border?: any;
}

interface BorderPropertiesState {
    border: any;
}

export default class BorderProperties extends React.Component<BorderPropertiesProps, BorderPropertiesState> {
    private onBorderStyleChangeBound = this.onBorderStyleChange.bind(this);
    private onBorderWidthChangeBound = this.onBorderWidthChange.bind(this);

    constructor(props: any) {
        super(props);

        this.state = {
            border: {
                borderStyle: props.border && props.border.borderStyle ? props.border.borderStyle : 'solid',
                borderColor: props.border && props.border.borderColor ? props.border.borderColor : 'black',
                borderWidth: props.border && props.border.borderWidth ? props.border.borderWidth : 1
            }
        }
    }

    render() {
        return (
            <div className='border-properties'>
                <div className='border-properties__header'>
                    <div>Border</div>
                    <Checkbox label='More Options' />
                </div>
                {
                    this.props.moreOptions
                        ? this.renderMoreOptions()
                        : this.renderLessOptions()
                }
            </div>
        );
    }

    private renderMoreOptions() {
        return undefined;
    }

    private renderLessOptions() {
        return [
            <Select key='select-border-style'
                options={['solid', 'dashed', 'double', 'groove', 'hidden', 'dotted', 'ridge']}
                onChange={this.onBorderStyleChangeBound} />,
            <InputNumberIncrement key='input-border-width'
                value={this.state.border.borderWidth}
                onChange={this.onBorderWidthChangeBound} />,
            <ColorPicker key='select-border-color'/>
        ];
    }

    private onBorderWidthChange(value: number) {
        this.setState({ border: { borderWidth: value } });
    }

    private onBorderStyleChange(value: number) {
        this.setState({ border: { borderStyle: value } });
    }
}
