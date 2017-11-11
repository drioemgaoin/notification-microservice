import * as React from 'react';
import * as PubSub from 'pubsub-js';
import * as bem from 'bem-classname';
import {assign, times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Container from './Container';
import actions from '../../../action';
import { IState } from '../../../reducer';

interface StructureStateToProps {
    selected: string;
    hover: string;
}

interface StructureDispatchToProps {
    actions: {
        select: (id: string) => void;
        hover: (id: string) => void;
    }
}

interface StructureDndProps {
    connectDragSource?: any;
}

interface StructureProps extends StructureDndProps, StructureStateToProps, StructureDispatchToProps {
    id?: string;
    numberOfColumns: number;
    rendered?: boolean;
    onClick?: (component: any) => void;
    onRemove?: (component: any) => void;
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
class Structure extends React.Component<StructureProps, StructureState> {
    private onClickBound = this.onClick.bind(this);
    private onRemoveBound = this.onRemove.bind(this);
    private onSelectBound = this.onSelect.bind(this);
    private onHoverBound = this.onHover.bind(this);
    private token: any;

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
        const selected = this.props.selected === this.props.id;
        const hover = this.props.hover === this.props.id;
        
        const className = bem('structure', { selected: selected, dragged: true });
        return (
            <div className={className}
                onClick={this.onSelectBound}
                onMouseEnter={this.onHoverBound}>
                {
                    selected && (
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
                                id={this.props.id}
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

    private onSelect(e: React.SyntheticEvent<HTMLSpanElement>) {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.select(this.props.id || '');
    }

    private onHover(e: React.SyntheticEvent<HTMLSpanElement>) {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.hover(this.props.id || '');
    }
}

const mapStateToProps = (state: IState) => {
    return {
        selected: state.selected,
        hover: state.hover
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect<StructureStateToProps, StructureDispatchToProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(Structure);
