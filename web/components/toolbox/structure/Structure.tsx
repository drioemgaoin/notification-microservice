import * as React from 'react';
import {assign, times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';

import Container from './Container';

interface StructureProps extends StructureDndProps {
    numberOfColumns: number;
    rendered?: boolean;
    onClick?: (callback: any) => void;
}

interface StructureDndProps {
    connectDragSource?: any;
}

interface StructureState {
    style: any;
}

const specSource: DragSourceSpec<StructureProps> = {
    beginDrag(props: StructureProps) {
        return { name: 'Structure', properties: { numberOfColumns: props.numberOfColumns } };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

@DragSource('Grid', specSource, collectSource)
export default class Structure extends React.Component<StructureProps, StructureState> {
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
        return (
            <div className='structure structure--dragged'>
            {
                times(this.props.numberOfColumns, (index: number) => {
                    const style = assign(
                        {},
                        {...this.state.style},
                        { width: 'calc(100% / ' + this.props.numberOfColumns + ')' }
                    );
                    return (
                        <Container className='structure__container' style={style}
                            onClick={this.props.onClick} />
                    );
                })
            }
            </div>
        );
    }
}

(Structure as any).propTypes = {
    value: PropTypes.any
};
