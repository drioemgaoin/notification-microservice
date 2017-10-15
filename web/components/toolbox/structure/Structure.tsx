import * as React from 'react';
import {times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';

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

@DragSource('Component', specSource, collectSource)
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
        return this.props.connectDragSource(
            <div className='structure structure--dragged'
                onClick={this.onClickBound}
                style={this.state.style}>
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
