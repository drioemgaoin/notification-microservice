import * as React from 'react';
import * as bem from 'bem-classname';
import {assign, times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';

import Container from './Container';

interface StructureProps extends StructureDndProps {
    id?: string;
    numberOfColumns: number;
    rendered?: boolean;
    onClick?: (component: any) => void;
    onRemove?: (component: any) => void;
}

interface StructureDndProps {
    connectDragSource?: any;
}

interface StructureState {
    style: any;
    selected: boolean;
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
    private onClickBound = this.onClick.bind(this);
    private onRemoveBound = this.onRemove.bind(this);

    constructor(props: StructureProps) {
        super(props);

        this.state = { 
            style: { border: { borderColor: 'blue' }},
            selected: false
        };
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
        const className = bem('structure', { selected: this.state.selected, dragged: true });
        return (
            <div className={className}>
                {
                    this.state.selected && (
                        <div className='structure__toolbar'>
                            <span className='structure__toolbar__cross' onClick={this.onRemoveBound}></span>
                        </div>
                    )
                }
                {
                    times(this.props.numberOfColumns, (index: number) => {
                        const style = assign(
                            {},
                            {...this.state.style},
                            { flex: 1 }
                        );
                        return (
                            <Container key={'container-' + index}
                                className='structure__container' 
                                style={style} 
                                onClick={this.onClickBound} />
                        );
                    })
                }
            </div>
        );
    }

    private onClick(component: any) {
        this.setState({ selected: !this.state.selected });

        if (this.props.onClick) {
            this.props.onClick(component);
        }
    }

    private onRemove(e: React.SyntheticEvent<HTMLSpanElement>) {
        e.preventDefault();

        if (this.props.onRemove) {
            this.props.onRemove(this);
        }
    }    
}
