import * as React from 'react';
import * as PropTypes from 'prop-types';
import { forEach, assign, filter, find } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Components from './toolbox/structureComponent';
import BorderProperties from './components/border/BorderProperties';
import actions from '../action';
import { IState } from '../reducer';

interface RendererStateToProps {
    components: any[];
}

interface RendererDispatchToProps {
    actions: {
        select: (id: string) => void;
        add: (component: any) => void;
        clone: (id: string) => void;
        remove: (id: string) => void;
    }
}

interface RendererProps extends RendererStateToProps, RendererDispatchToProps {
    connectDropTarget?: any;
    onClick?: (component: any) => void;
}

interface RendererState {
    components: Array<any>;
}

const specTarget: DropTargetSpec<RendererProps> = {
    drop(props: RendererProps, monitor: DropTargetMonitor, component: React.Component<RendererProps, RendererState>) {
        const item: any = monitor.getItem();
        if (!item.rendered) {
            component.props.actions.add(assign({}, {...item}, { id: 'structure-' + (component.props.components.length + 1) }));
        }
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

class Renderer extends React.Component<RendererProps, RendererState> {
    render() {
        return (
            this.props.connectDropTarget(
                <div className='Renderer'>
                    {
                        this.props.components.map((component, index) => {
                            return React.createElement(
                                (Components as any)[component.name],
                                {
                                    key: component.id,
                                    id: component.id,
                                    ref: component.id,
                                    rendered: true,
                                    actions: {
                                        toolbar: {
                                            remove: this.remove,
                                            clone: this.clone
                                        }
                                    },
                                    ...assign({}, component.properties)
                                }
                            )
                        })
                    }
                </div>
            )
        )
    }

    private remove = (componentId: string) => {
        this.props.actions.remove(componentId);
    };

    private clone = (componentId: string) => {
        this.props.actions.clone(componentId);
    };
}

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        components: state.components
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default compose(
    connect<RendererStateToProps, RendererDispatchToProps>(mapStateToProps, mapDispatchToProps, null, { withRef: true }),
    DropTarget('Grid', specTarget, collectTarget)
)(Renderer);
