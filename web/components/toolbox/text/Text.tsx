import * as React from 'react';
import { DragSource, DropTarget, DragSourceConnector, DragSourceMonitor, DropTargetMonitor, DragSourceSpec, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick } from 'lodash';

import getSchema from './schema';

interface TextProps extends TextDndProps {
    value?: any;
    rendered?: boolean;
    onClick?: (component: any, callback: any) => void;
}

export interface TextDndProps {
    connectDragSource?: any;
    connectDropTarget?: any;
}

const specSource: DragSourceSpec<TextProps> = {
    beginDrag(props: TextProps) {
        return { name: 'Text', rendered: props.rendered };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

const specTarget: DropTargetSpec<TextProps> = {
    hover(props: TextProps, monitor: DropTargetMonitor, component: React.Component<any, any>) {

    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DragSource('Component', specSource, collectSource)
@DropTarget('Component', specTarget, collectTarget)
export default class Text extends React.Component<TextProps, any> {
    private onClickBound = this.onClick.bind(this);
    private onCallbackBound = this.onCallback.bind(this);

    static defaultProps = {
        value: 'Empty Text'
    }

    constructor(props: TextProps) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    render() {
        return this.props.rendered
            ? this.renderDragged()
            : this.renderDraggable();
    }

    private renderDraggable() {
        return this.props.connectDragSource(
            <div className='text text--draggable'>Text</div>
        );
    }

    private renderDragged() {
        return this.props.connectDragSource(
            this.props.connectDropTarget(
                <div className='text text--dragged' onClick={this.onClickBound}>
                {this.state.value}
                </div>
            )
        );
    }

    onCallback(values: any) {
        this.setState({
            value: values['value']
        });
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(getSchema(this.state), this.onCallbackBound);
        }
    }
}

(Text as any).propTypes = {
    value: PropTypes.any
};
