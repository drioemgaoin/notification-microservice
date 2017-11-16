import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';

interface TextDndProps {
    connectDragSource?: any;
}

interface TextProps extends TextDndProps {
    numberOfColumns: number;
}

const specSource: DragSourceSpec<TextProps> = {
    beginDrag(props: TextProps) {
        return { name: 'Text' };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

const Text: React.SFC<any> = props => {
    return props.connectDragSource(
        <div className='text text--draggable'>Text</div>
    )
};

export default DragSource('Element', specSource, collectSource)(Text);