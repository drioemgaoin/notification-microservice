import * as React from 'react';
import { DragSource, DropTarget, DragSourceConnector, DragSourceMonitor, DropTargetMonitor, DragSourceSpec, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick } from 'lodash';

import getSchema from './schema';

interface DateProps extends DateDndProps {
    value?: any;
    format?: string;
    rendered?: boolean;
    onClick?: (component: any, callback: any) => void;
}

export interface DateDndProps {
    connectDragSource?: any;
    connectDropTarget?: any;
}

const specSource: DragSourceSpec<DateProps> = {
    beginDrag(props: DateProps) {
        return { name: 'Date', rendered: props.rendered };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

@DragSource('Element', specSource, collectSource)
export default class Date extends React.Component<DateProps, any> {
    private onClickBound = this.onClick.bind(this);
    private onCallbackBound = this.onCallback.bind(this);

    static defaultProps = {
        value: moment(),
        format: 'DD/MM/YYYY'
    }

    constructor(props: DateProps) {
        super(props);

        this.state = {
            value: props.value,
            format: props.format
        };
    }

    render() {
        return this.props.rendered
            ? this.renderDragged()
            : this.renderDraggable();
    }

    private renderDraggable() {
        return this.props.connectDragSource(
            <div className='date date--draggable'>Date</div>
        );
    }

    private renderDragged() {
        return this.props.connectDragSource(
            <div className='date date--dragged' onClick={this.onClickBound}>
            {moment(this.state.value).format(this.state.format)}
            </div>
        );
    }

    onCallback(values: any) {
        this.setState({
            value: moment(values['value']),
            format: values['format']
        });
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(getSchema(this.state), this.onCallbackBound);
        }
    }
}

(Date as any).propTypes = {
    value: PropTypes.any,
    format: PropTypes.string
};
