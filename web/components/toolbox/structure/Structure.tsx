import * as React from 'react';
import {assign, times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec, DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';

import Components from '../../toolbox/contentComponent';

interface StructureProps extends StructureDndProps {
    numberOfColumns: number;
    rendered?: boolean;
    onClick?: (callback: any) => void;
}

interface StructureDndProps {
    connectDropTarget?: any;
    connectDragSource?: any;
}

interface StructureState {
    style: any;
    component?: any;
}

const specSource: DragSourceSpec<StructureProps> = {
    beginDrag(props: StructureProps) {
        return { name: 'Structure', properties: { numberOfColumns: props.numberOfColumns } };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

const specTarget: DropTargetSpec<StructureProps> = {
    drop(props: StructureProps, monitor: DropTargetMonitor, component: React.Component<StructureProps, StructureState>) {
        const item: any = monitor.getItem();
        if (!item.rendered) {
            const element = React.createElement(
                    (Components as any)[item.name],
                    {
                        key: 'component-1',
                        rendered: true,
                        onClick: component.props.onClick,
                        ...assign({}, item.properties)
                    });

            component.setState({ component: element });
        }
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DragSource('Grid', specSource, collectSource)
@DropTarget('Element', specTarget, collectTarget)
export default class Structure extends React.Component<StructureProps, StructureState> {
    private onClickBound = this.onClick.bind(this);
    private onUpdateBound = (style: any) => this.onUpdate(style);

    constructor(props: StructureProps) {
        super(props);

        this.state = { style: { border: { borderColor: 'blue' }} };
    }

    render() {
        return this.props.rendered
            ? this.renderDragged()
            : this.renderDraggable();
    }

    private renderDraggable() {
        return this.props.connectDragSource(
            <div className='structure structure--draggable'>{this.props.numberOfColumns} column(s)</div>
        );
    }

    private renderDragged() {
        return this.props.connectDropTarget(
            <div className='structure structure--dragged'
                onClick={this.onClickBound}>
            {
                times(this.props.numberOfColumns, (index: number) => {
                    const style = assign(
                        {},
                        {...this.state.style},
                        { width: 'calc(100% / ' + this.props.numberOfColumns + ')' }
                    );
                    return (
                        <div key={'structure-' + index}
                            className='structure__container' style={style}>
                            {
                                this.state.component ? (
                                    this.state.component
                                ) : (
                                    <span>No content here. Drag component from the toolbox.</span>
                                )
                            }
                        </div>
                    );
                })
            }
            </div>
        );
    }

    private onClick(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(this.onUpdateBound);
        }
    }

    private onUpdate(style: any) {
        this.setState({ style });
    }
}

(Structure as any).propTypes = {
    value: PropTypes.any
};
