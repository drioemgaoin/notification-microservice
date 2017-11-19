import * as React from 'react';
import { upperFirst } from 'lodash';

import Navbar from '../nav-bar/index';
import Toolbox from '../../Toolbox';

export default class WidgetTab extends React.Component<any, any> {
    state = { category: 'content' };

    render() {
        return (
            <div className='widget-tab'>
                <Navbar
                    click={this.onClick}
                    active={this.state.category}
                />
                <div className='widget-tab__content'>
                    {
                        this.state.category && (
                            <Toolbox 
                                category={this.state.category} 
                                actions={this.props.actions}
                            />
                    )}
                </div>
            </div>
        )
    }

    private onClick = (e: React.SyntheticEvent<HTMLLIElement>) => {
        e.preventDefault();

        this.setState({ category: e.currentTarget.dataset['name'] });
    };
}
