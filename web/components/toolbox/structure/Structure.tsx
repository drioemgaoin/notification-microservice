import * as React from 'react';
import {times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';

interface StructureProps extends StructureDndProps {
    numberOfColumns?: number;
    rendered?: boolean;
}

export interface StructureDndProps {
    connectDragSource?: any;
}

const specSource: DragSourceSpec<StructureProps> = {
    beginDrag(props: StructureProps) {
        return { name: 'Structure', properties: { numberOfColumns: props.numberOfColumns } };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

@DragSource('Component', specSource, collectSource)
export default class Structure extends React.Component<any, any> {
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
        return this.props.connectDragSource(
            <div className='structure structure--dragged'>
            {
                times(this.props.numberOfColumns, () => {
                    return (
                        <div style={{ width: 'calc(100% / ' + this.props.numberOfColumns + ')' }}>
                            <span>No content here. Drag component from the toolbox.</span>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}