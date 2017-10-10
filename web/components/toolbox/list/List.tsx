import * as React from 'react';
import { DragSource, DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as PropTypes from 'prop-types';

import getSchema from './schema';

interface ListProps extends ListDndProps {
    rendered?: boolean;
    items: string[];
    onClick: (component: any, callback: any) => void;
}

export interface ListDndProps {
    connectDragSource?: any;
}

const boxSource = {
    beginDrag(props: any) {
        return { name: 'List' };
    }
};

const collect = (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource()
});

class List extends React.Component<ListProps, any> {
    private onClickBound = this.onClick.bind(this);
    private onCallbackBound = this.onCallback.bind(this);

    static defaultProps = {
        items: []
    }

    constructor(props: ListProps) {
        super(props);

        this.state = {
            items: props.items
        };
    }

    render() {
        return this.props.rendered
            ? this.renderComponent()
            : ( this.props.connectDragSource(<div title='Display the list of values'>List</div>) );
    }

    onCallback(values: any) {
        console.log(values);
        this.setState({
            items: values['items']
        });
    }

    private renderComponent() {
        return this.state.items.length > 0
        ? (
            <ul className='list' onClick={this.onClickBound}>
            {
                this.state.items.map((item: any) => {
                    return <li>{item}</li>;
                })
            }
            </ul>
        ) : (
            <div className='list' onClick={this.onClickBound}>Empty List</div>
        );
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(getSchema(this.state), this.onCallbackBound);
        }
    }
}

(List as any).propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DragSource('Component', boxSource, collect)(List);
