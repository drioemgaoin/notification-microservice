import * as React from 'react';
import * as PubSub from 'pubsub-js';
import * as bem from 'bem-classname';
import { DragSource, DropTarget, DragSourceConnector, DragSourceMonitor, DropTargetMonitor, DragSourceSpec, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick } from 'lodash';

import getSchema from './schema';

interface TextProps extends TextDndProps {
    id?: string,
    value?: any;
    rendered?: boolean;
    onClick?: (component: any) => void;
    onRemove?: (component: any) => void;
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

@DragSource('Element', specSource, collectSource)
export default class Text extends React.Component<TextProps, any> {
    private onClickBound = this.onClick.bind(this);
    private onCallbackBound = this.onCallback.bind(this);
    private onRemoveBound = this.onRemove.bind(this);
    private token: any;

    static defaultProps = {
        value: 'Empty Text'
    }

    constructor(props: TextProps) {
        super(props);

        this.state = {
            value: props.value,
            selected: false
        };
    }

    render() {
        return this.props.rendered
            ? this.renderDragged()
            : this.renderDraggable();
    }

    componentWillMount(){
        this.token = PubSub.subscribe('COMPONENT_SELECTED', this.select.bind(this));
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
    }

    select(msg: string, id: any) {
        this.setState({ selected:  this.props.id === id ? !this.state.selected : false });
    }

    private renderDraggable() {
        return this.props.connectDragSource(
            <div className='text text--draggable'>Text</div>
        );
    }

    private renderDragged() {
        const className = bem('text', { selected: this.state.selected, dragged: true });
        return this.props.connectDragSource(
            <div className={className} onClick={this.onClickBound}>
            {
                this.state.selected && (
                    <div className='text__toolbar'>
                        <span className='text__toolbar__cross' onClick={this.onRemoveBound}></span>
                    </div>
                )
            }
            {this.state.value}
            </div>
        );
    }

    onCallback(values: any) {
        this.setState({
            value: values['value']
        });
    }

    private onClick(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onClick) {
            this.props.onClick(this);
        }
    }

    private onRemove(e: React.SyntheticEvent<HTMLSpanElement>) {
        e.preventDefault();

        if (this.props.onRemove) {
            this.props.onRemove(this);
        }
    }
}

(Text as any).propTypes = {
    value: PropTypes.any
};
