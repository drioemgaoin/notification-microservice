import * as React from 'react';
import { upperFirst } from 'lodash';

import Navbar from '../nav-bar/index';
import Toolbox from '../../Toolbox';

interface WidgetTabProps {
    category?: string;
    actions: any;
}

interface WidgetTabState {
    category: string;
}

export default class WidgetTab extends React.Component<WidgetTabProps, WidgetTabState> {
    state = { category: 'content' };

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.category !== this.state.category) {
            this.setState({ category: nextProps.category });
        }
    }

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

        const category = e.currentTarget.dataset['name'];
        if (category) {
            this.setState({ category });
        }
    };
}
