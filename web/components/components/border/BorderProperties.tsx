import * as React from 'react';
import {assign} from 'lodash';

import Select from '../select/index';
import InputNumberIncrement from '../input-number/InputNumberIncrement';
import ColorPicker from '../color-picker/index';
import Checkbox from '../checkbox/Checkbox';

interface BorderPropertiesProps {
    moreOptions?: boolean,
    borderStyle?: string,
    borderWidth?: number,
    borderColor?: string,
    borderLeftStyle?: string,
    borderLeftWidth?: number,
    borderLeftColor?: string,
    borderTopStyle?: string,
    borderTopWidth?: number,
    borderTopColor?: string,
    borderBottomStyle?: string,
    borderBottomWidth?: number,
    borderBottomColor?: string,
    onChange?: (border: any) => void;
}

interface BorderPropertiesState {
    border: any;
    moreOptions: boolean;
}

export default class BorderProperties extends React.Component<BorderPropertiesProps, BorderPropertiesState> {
    private static DefaultBorder: any = {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'transparent'
    };

    private onBorderStyleChangeBound = (key: any, value: string) => this.onBorderStyleChange(key, value);
    private onBorderWidthChangeBound = (key: any, value: number) => this.onBorderWidthChange(key, value);
    private onBorderColorChangeBound = (key: any, value: string) => this.onBorderColorChange(key, value);
    private onOptionsChangedBound = this.onOptionsChanged.bind(this);

    constructor(props: any) {
        super(props);

        this.state = {
            border: this.getInitialValues(props, props.moreOptions),
            moreOptions: props.moreOptions
        };
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
                    value={this.state.border[key + 'Style']}
                    onChange={(value) => this.onBorderStyleChangeBound(key, value)} />
                <InputNumberIncrement key={'input-' + key + '-width'}
                    value={this.state.border[key + 'Width']}
                    onChange={(value) => this.onBorderWidthChangeBound(key, value)} />
                <ColorPicker key={'select-' + key + '-color'}
                    value={this.state.border[key + 'Color']}
                    onChange={(value) => this.onBorderColorChangeBound(key, value)} />
            </div>
        )
    }

    private onBorderWidthChange(key: any, value: number) {
        this.onBorderChanged(assign({...this.state.border}, { [key + 'Width']: value }));
    }

    private onBorderStyleChange(key: any, value: string) {
        this.onBorderChanged(assign({...this.state.border}, { [key + 'Style']: value }));
    }

    private onBorderColorChange(key: any, value: string) {
        this.onBorderChanged(assign({...this.state.border}, { [key + 'Color']: value }));
    }

    private onOptionsChanged(checked: boolean) {
        let border = {};

        if (checked) {
            ['Left', 'Top', 'Right', 'Bottom'].map(key => {
                border = assign(border, {
                    ['border' + key + 'Style']: this.state.border.borderStyle,
                    ['border' + key + 'Width']: this.state.border.borderWidth,
                    ['border' + key + 'Color']: this.state.border.borderColor
                });
            });
        } else {
            border = BorderProperties.DefaultBorder;
        }

        this.setState({
            moreOptions: checked,
            border
        });

        this.notify(border);
    }

    private onBorderChanged(border: any) {
        this.setState({ border });
        this.notify(border);
    }

    private notify(border: any) {
        if (this.props.onChange) {
            this.props.onChange(border);
        }
    }

    private getInitialValues(values: any, moreOptions: boolean) {
        if (moreOptions) {
            let border = {};

            ['Left', 'Top', 'Right', 'Bottom'].map(key => {
                border = assign(border, {
                    ['border' + key + 'Style']: values['border' + key + 'Style'] ? values['border' + key + 'Style'] : values.borderStyle,
                    ['border' + key + 'Width']: values['border' + key + 'Width'] ? values['border' + key + 'Width'] : values.borderWidth,
                    ['border' + key + 'Color']: values['border' + key + 'Color'] ? values['border' + key + 'Color'] : values.borderColor
                });
            });

            return border;
        }

        return BorderProperties.DefaultBorder;
    }
}
