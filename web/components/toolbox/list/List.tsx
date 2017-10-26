import * as React from 'react';
import { DragSource, DropTarget, DragSourceConnector, DragSourceMonitor, DropTargetMonitor, DragSourceSpec, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';

import getSchema from './schema';

interface ListProps extends ListDndProps {
    rendered?: boolean;
    items?: string[];
    onClick?: (component: any, callback: any) => void;
}

export interface ListDndProps {
    connectDragSource?: any;
}

const specSource: DragSourceSpec<ListProps> = {
    beginDrag(props: ListProps) {
        return { name: 'List', rendered: props.rendered };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

@DragSource('Element', specSource, collectSource)
export default class List extends React.Component<ListProps, any> {
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
            ? this.renderDragged()
            : this.renderDraggable()
    }

    private renderDraggable() {
        return this.props.connectDragSource(
            <div className='list list--draggable'>List</div>
        );
    }

    private renderDragged() {
        return this.props.connectDragSource(
            <div className='list list--dragged' onClick={this.onClickBound}>
            {
                this.state.items.length > 0
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
                )
            }
            </div>
        );
    }

    onCallback(values: any) {
        this.setState({
            items: values['items']
        });
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(getSchema(this.state), this.onCallbackBound);
        }
    }
}

(List as any).propTypes = {
    items: PropTypes.arrayOf(PropTypes.string)
};
