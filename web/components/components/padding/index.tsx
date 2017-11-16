import * as React from 'react';
import {assign} from 'lodash';

import InputNumberIncrement from '../input-number/InputNumberIncrement';
import Checkbox from '../checkbox/Checkbox';

interface PaddingPropertiesProps {
    moreOptions?: boolean,
    padding?: number,
    paddingLeft?: number,
    paddingTop?: number,
    paddingRight?: number,
    paddingBottom?: number,
    onChange?: (padding: any) => void;
}

interface PaddingPropertiesState {
    padding: any;
    moreOptions: boolean;
}

export default class PaddingProperties extends React.Component<PaddingPropertiesProps, PaddingPropertiesState> {
    private static DefaultPadding: any = {
        padding: 1
    };

    private onPaddingWidthChangeBound = (key: any, value: number) => this.onPaddingWidthChange(key, value);
    private onOptionsChangedBound = this.onOptionsChanged.bind(this);

    constructor(props: any) {
        super(props);

        this.state = {
            padding: this.getInitialValues(props, props.moreOptions),
            moreOptions: props.moreOptions
        };
    }

    render() {
        return (
            <div className='padding-properties'>
                <div className='padding-properties__header'>
                    <div>Padding</div>
                    <Checkbox label='More Options'
                        onChange={this.onOptionsChangedBound} />
                </div>
                <div className='padding-properties__body'>
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
            this.renderOptions('paddingTop', 'Top side'),
            this.renderOptions('paddingRight', 'Right side'),
            this.renderOptions('paddingBottom', 'Bottom side'),
            this.renderOptions('paddingLeft', 'Left side')
        ]
    }

    private renderLessOptions() {
        return this.renderOptions('padding', 'All sides');
    }

    private renderOptions(key: string, title: string) {
        return (
            <div className='padding-properties__body__container'>
                <div className='padding-properties__body__container__title'>{title}</div>
                <InputNumberIncrement key={'input-' + key}
                    value={this.state.padding[key]}
                    onChange={(value) => this.onPaddingWidthChangeBound(key, value)} />
            </div>
        )
    }

    private onPaddingWidthChange(key: any, value: number) {
        this.onPaddingChanged(assign({...this.state.padding}, { [key]: value }));
    }

    private onOptionsChanged(checked: boolean) {
        let padding = {};

        if (checked) {
            ['Left', 'Top', 'Right', 'Bottom'].map(key => {
                padding = assign(padding, {
                    ['padding' + key]: this.state.padding.padding
                });
            });
        } else {
            padding = PaddingProperties.DefaultPadding;
        }

        this.setState({
            moreOptions: checked,
            padding
        });

        this.notify(padding);
    }

    private onPaddingChanged(padding: any) {
        this.setState({ padding });
        this.notify(padding);
    }

    private notify(padding: any) {
        if (this.props.onChange) {
            this.props.onChange(padding);
        }
    }

    private getInitialValues(values: any, moreOptions: boolean) {
        if (moreOptions) {
            let padding = {};

            ['Left', 'Top', 'Right', 'Bottom'].map(key => {
                padding = assign(padding, {
                    ['padding' + key]: values['padding' + key] ? values['padding' + key] : values.padding
                });
            });

            return padding;
        }

        return PaddingProperties.DefaultPadding;
    }
}
