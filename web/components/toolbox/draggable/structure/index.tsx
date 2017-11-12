import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';

interface StructureDndProps {
    connectDragSource?: any;
}

interface StructureProps extends StructureDndProps {
    numberOfColumns: number;
}

const specSource: DragSourceSpec<StructureProps> = {
    beginDrag(props: StructureProps) {
        return { name: 'Structure', properties: { numberOfColumns: props.numberOfColumns } };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

const Structure: React.SFC<any> = props => {
    return props.connectDragSource(
        <div className='structure structure--draggable'>{props.numberOfColumns} column(s)</div>
    )
};

export default DragSource('Grid', specSource, collectSource)(Structure);
