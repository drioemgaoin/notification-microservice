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

interface RendererDndProps {
    connectDropTarget?: any;
}

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

interface RendererProps extends RendererStateToProps, RendererDispatchToProps, RendererDndProps {
    onClick?: (component: any) => void;
}

interface RendererState {
    components: any[];
}

const specTarget: DropTargetSpec<RendererProps> = {
    drop(props: RendererProps, monitor: DropTargetMonitor, component: React.Component<RendererProps, RendererState>) {
        const item: any = monitor.getItem();
        if (!item.rendered) {
            component.props.actions.add(assign({}, {...item}));
        }
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Grid', specTarget, collectTarget)
class Renderer extends React.Component<RendererProps, RendererState> {
    render() {
        return (
            this.props.connectDropTarget(
                <div className='Renderer'>
                    {
                        this.props.components.map((component: any, index: number) => {
                            return React.createElement(
                                (Components as any)[component.name],
                                {
                                    key: component.id,
                                    id: component.id,
                                    ref: component.id,
                                    rendered: true,
                                    actions: this.props.actions,
                                    ...assign({}, component.properties)
                                }
                            )
                        })
                    }
                </div>
            )
        )
    }

    getValue() {
        return Object.keys(this.refs).map((key: string) => (this.refs[key] as any).getValue());
    }

    private remove = (componentId: string) => {
        this.props.actions.remove(componentId);
    };

    private clone = (componentId: string) => {
        this.props.actions.clone(componentId);
    };
}

const mapStateToProps = (state: IState, ownProps: RendererProps) => {
    return {
        ...ownProps,
        components: state.root.map((id: any) => state.components[id])
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect<RendererStateToProps, RendererDispatchToProps>(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Renderer);