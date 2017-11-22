import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import * as bem from 'bem-classname';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
    DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec
} from 'react-dnd';

import actions from '../../../action';
import { IState } from '../../../reducer';
import ContainerToolbar from '../container-toolbar/index';
import ButtonIcon from '../button/index';

interface ContainerDndProps {
    connectDragSource?: any;
    connectDropTarget?: any;
    connectDragPreview?: any;
}

interface ContainerStateToProps {
    selected: string;
    highlighted: any;
}

interface ContainerDispatchToProps {
    actions: {
        select: (id: string) => void;
        highlight: (id: string) => void;
        move: (hover: string, drag: string) => void;
    }
}

interface ContainerProps extends ContainerStateToProps, ContainerDispatchToProps, ContainerDndProps {
    id: string;
    handlers: any;
    moveOnRightSide?: boolean;
}

const specSource: DragSourceSpec<ContainerProps> = {
    beginDrag(props: ContainerProps) {
        return { id: props.id };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
});

const specTarget: DropTargetSpec<ContainerProps> = {
    hover(props: ContainerProps, monitor: DropTargetMonitor, component: React.Component<ContainerProps, any>) {
        const item: any = monitor.getItem();

        const drag = item.id;
		const hover = props.id;

		if (drag === hover) {
			return
		}

		const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		if (drag < hover && hoverClientY < hoverMiddleY) {
			return
		}

		if (drag > hover && hoverClientY > hoverMiddleY) {
			return
		}

        if (props.actions.move) {
            props.actions.move(hover, drag)
        }
    }
};

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DragSource('Container', specSource, collectSource)
@DropTarget('Container', specTarget, collectTarget)
class Container extends React.Component<ContainerProps, any> {
    render() {
        const selected = this.props.selected === this.props.id;
        const highlighted = this.props.highlighted[this.props.id] === true;

        const className = bem('container', {
            selected,
            highlighted,
            dragged: true
        });

        const moveClassName = bem('container__icon', {
            move: !this.props.moveOnRightSide,
            'move-right': this.props.moveOnRightSide
        });

        const style = {
            width: '100%'
        };

        return this.props.connectDropTarget(
            this.props.connectDragPreview(
                <div
                    className={className}
                    style={style}
                    onClick={this.select}
                    onMouseEnter={this.highlight}
                    onMouseLeave={this.highlight}
                >
                    {
                        (highlighted || selected) &&
                        this.props.connectDragSource(
                            <span className={moveClassName} />
                        )
                    }
                    {
                        selected &&
                        (
                            <ContainerToolbar click={this.click} />
                        )
                    }
                    {this.props.children}
                </div>
            )
        )
    }

    public getValue() {
        return this.props.children 
            ? (this.props.children as any).getValue()
            : undefined ;
    }

    private click = (action: string) => {
        const component = this.props.selected;
        if (component) {
            const handler = this.props.handlers['toolbar'][action];
            if (handler) {
                handler(this.props.id);
            }
        }
    }

    private select = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.select(this.props.id);
    }

    private highlight = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.highlight(this.props.id);
    }
}

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        selected: state.selected,
        highlighted: state.highlighted
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default compose(
    connect<ContainerStateToProps, ContainerDispatchToProps>(mapStateToProps, mapDispatchToProps)
)(Container);
