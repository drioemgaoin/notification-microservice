import * as React from 'react';

import { assign, find } from 'lodash';
import ListItems from './components/list/ListItems';

export default class Properties extends React.Component<any, any> {
    private onOkBound = this.validate.bind(this);
    private onCancelBound = this.cancel.bind(this);
    private onChangeBound = this.change.bind(this);
    private onComponentChangeBound = this.componentChange.bind(this);

    static defaultProps = {
        properties: []
    };

    constructor(props: any) {
        super(props);

        this.state = assign({}, ...props.properties.map((x:any) => ({ [x.name]: x.value })));
    }

    render() {
        return this.props.properties.length > 0 &&
        (
            <div className='properties'>
                <div className='properties__body'>
                    {
                        this.props.properties.map((property: any) => {
                            return (
                                <div key={property.name} className='properties__property'>
                                    <label className='properties__property__label'>{property.name}</label>
                                    {this.renderValue(property)}
                                </div>
                            );
                        })
                    }
                </div>
                <div className='properties__footer'>
                    <button className='properties__footer__button properties__footer__button--primary' onClick={this.onOkBound}>OK</button>
                    <button className='properties__footer__button properties__footer__button--secondary' onClick={this.onCancelBound}>Cancel</button>
                </div>
            </div>
        );
    }

    private renderValue(property: any) {
        if (property.component === 'select') {
            return (
                <select name={property.name}
                        className='select'
                        onChange={this.onChangeBound}
                        value={this.state[property.name]}>
                {
                    property.options.map((option: any) => {
                        return <option key={option} value={option}>{option}</option>;
                    })
                }
                </select>
            );
        } else if (property.component === 'list') {
            return (
                <ListItems name={property.name}
                        items={this.state[property.name]}
                        onChange={(value: any) => this.onComponentChangeBound(property.name, value)} />
            );
        }

        return (
            <input name={property.name}
                type={property.component}
                className='properties__property__value'
                value={this.state[property.name]}
                onChange={this.onChangeBound} />
        );
    }

    private componentChange(name: string, value: any) {
        this.setState({ [name]: value });
    }

    private change(e: any) {
        e.preventDefault();

        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    }

    private validate(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (this.props.onValidate) {
            this.props.onValidate(this.state);
        }
    }

    private cancel(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
}
