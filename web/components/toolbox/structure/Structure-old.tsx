import * as React from 'react';
import * as PubSub from 'pubsub-js';
import * as bem from 'bem-classname';
import {assign, times} from 'lodash';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Container from './Container-old';
import actions from '../../../action';
import { IState } from '../../../reducer';

interface StructureStateToProps {
    selected: string;
    highlight: string;
}

interface StructureDispatchToProps {
    actions: {
        select: (id: string) => void;
        highlight: (id: string) => void;
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
    private token: any;

    constructor(props: StructureProps) {
        super(props);

        this.state = {
            style: { border: { borderColor: 'blue' }}
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
        const highlight = this.props.highlight === this.props.id;

        const toolbarClassName = bem('structure__toolbar', { cross: selected, move: highlight });
        const className = bem('structure', { selected: selected, hover: highlight, dragged: true });
        return (
            <div className={className}
                onClick={this.select}
                onMouseEnter={this.highlight}
                onMouseLeave={this.highlight}>
                {
                    (selected || highlight) && (
                        <div className='structure__toolbar'>
                            <span className={toolbarClassName} onClick={this.remove}></span>
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

    private remove = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();

        if (this.props.onRemove) {
            this.props.onRemove(this);
        }
    }

    private select = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.select(this.props.id || '');
    }

    private highlight = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.highlight(this.props.id || '');
    }
}

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        selected: state.selected,
        highlight: state.highlight[ownProps.id]
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
