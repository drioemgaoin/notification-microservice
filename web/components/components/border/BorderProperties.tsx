import * as React from 'react';
import {assign} from 'lodash';

import Select from '../select/Select';
import InputNumberIncrement from '../input-number/InputNumberIncrement';
import ColorPicker from '../color-picker/ColorPicker';
import Checkbox from '../checkbox/Checkbox';

interface BorderPropertiesProps {
    moreOptions?: boolean,
    border?: any;
    borderLeft?: any;
    borderTop?: any;
    borderRight?: any;
    borderBottom?: any;
    onChange?: (border: any) => void;
}

interface BorderPropertiesState {
    border: any;
    borderDetailed: any;
    moreOptions: boolean;
}

export default class BorderProperties extends React.Component<BorderPropertiesProps, BorderPropertiesState> {
    private onBorderStyleChangeBound = (key: any, value: string) => this.onBorderStyleChange(key, value);
    private onBorderWidthChangeBound = (key: any, value: number) => this.onBorderWidthChange(key, value);
    private onBorderColorChangeBound = (key: any, value: string) => this.onBorderColorChange(key, value);
    private onOptionsChangedBound = this.onOptionsChanged.bind(this);

    constructor(props: any) {
        super(props);

        this.state = {
            border: {
                borderStyle: props.border && props.border.borderStyle ? props.border.borderStyle : 'solid',
                borderColor: props.border && props.border.borderColor ? props.border.borderColor : 'transparent',
                borderWidth: props.border && props.border.borderWidth ? props.border.borderWidth : 1
            },
            borderDetailed: {
                borderLeftStyle: props.borderLeft && props.borderLeft.borderStyle ? props.borderLeft.borderStyle : 'solid',
                borderLeftColor: props.borderLeft && props.borderLeft.borderColor ? props.borderLeft.borderColor : 'transparent',
                borderLeftWidth: props.borderLeft && props.borderLeft.borderWidth ? props.borderLeft.borderWidth : 1,
                borderTopStyle: props.borderTop && props.borderTop.borderStyle ? props.borderTop.borderStyle : 'solid',
                borderTopColor: props.borderTop && props.borderTop.borderColor ? props.borderTop.borderColor : 'transparent',
                borderTopWidth: props.borderTop && props.borderTop.borderWidth ? props.borderTop.borderWidth : 1,
                borderRightStyle: props.borderRight && props.borderRight.borderStyle ? props.borderRight.borderStyle : 'solid',
                borderRightColor: props.borderRight && props.borderRight.borderColor ? props.borderRight.borderColor : 'transparent',
                borderRightWidth: props.borderRight && props.borderRight.borderWidth ? props.borderRight.borderWidth : 1,
                borderBottomStyle: props.borderBottom && props.borderBottom.borderStyle ? props.borderBottom.borderStyle : 'solid',
                borderBottomColor: props.borderBottom && props.borderBottom.borderColor ? props.borderBottom.borderColor : 'transparent',
                borderBottomWidth: props.borderBottom && props.borderBottom.borderWidth ? props.borderBottom.borderWidth : 1
            },
            moreOptions: false
        }
    }

    render() {
        return (
            <div className='border-properties'>
                <div className='border-properties__header'>
                    <div>Border</div>
                    <Checkbox label='More Options'
                        onChange={this.onOptionsChangedBound} />
                </div>
                <div className='border-properties__body'>
                {
                    this.state.moreOptions
                        ? this.renderMoreOptions()
                        : this.renderLessOptions()
                }
                </div>
            </div>
        );
    }

    private renderMoreOptions() {
        return [
            this.renderOptions('borderTop', 'Top side'),
            this.renderOptions('borderRight', 'Right side'),
            this.renderOptions('borderBottom', 'Bottom side'),
            this.renderOptions('borderLeft', 'Left side')
        ]
    }

    private renderLessOptions() {
        return this.renderOptions('border', 'All sides');
    }

    private renderOptions(key: string, title: string) {
        return (
            <div className='border-properties__body__container'>
                <div className='border-properties__body__container__title'>{title}</div>
                <Select key={'select-' + key + '-style'}
                    options={['solid', 'dashed', 'double', 'groove', 'hidden', 'dotted', 'ridge']}
                    value={this.getValue(key + 'Style')}
                    onChange={(value) => this.onBorderStyleChangeBound(key, value)} />
                <InputNumberIncrement key={'input-' + key + '-width'}
                    value={this.getValue(key + 'Width')}
                    onChange={(value) => this.onBorderWidthChangeBound(key, value)} />
                <ColorPicker key={'select-' + key + '-color'}
                    value={this.getValue(key + 'Color')}
                    onChange={(value) => this.onBorderColorChangeBound(key, value)} />
            </div>
        )
    }

    private onBorderWidthChange(key: any, value: number) {
        const borderKey = this.state.moreOptions ? 'borderDetailed' : 'border';
        this.notify({ [borderKey]: assign((this.state as any)[borderKey], { [key + 'Width']: value }) });
    }

    private onBorderStyleChange(key: any, value: string) {
        const borderKey = this.state.moreOptions ? 'borderDetailed' : 'border';
        this.notify({ [borderKey]: assign((this.state as any)[borderKey], { [key + 'Style']: value }) });
    }

    private onBorderColorChange(key: any, value: string) {
        const borderKey = this.state.moreOptions ? 'borderDetailed' : 'border';
        this.notify({ [borderKey]: assign((this.state as any)[borderKey], { [key + 'Color']: value }) });
    }

    private onOptionsChanged(checked: boolean) {
        this.notify({
            moreOptions: checked
        });
    }

    private notify(border: any) {
        this.setState(border);

        if (this.props.onChange) {
            this.props.onChange(border[this.state.moreOptions ? 'borderDetailed' : 'border']);
        }
    }

    private getValue(key: string) {
        const borderKey = this.state.moreOptions ? 'borderDetailed' : 'border';
        return this.state[borderKey][key];
    }
}
