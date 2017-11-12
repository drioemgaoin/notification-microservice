import * as React from 'react';
import * as PropTypes from 'prop-types';
import { forEach, assign, filter } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Components from './toolbox/structureComponent';
import BorderProperties from './components/border/BorderProperties';

interface RendererStateToProps {
    component: string;
}

interface RendererDispatchToProps {
    actions: {
        select: (id: string) => void;
    }
}

interface RendererProps {
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
            const components = component.state.components.concat([item]);
            component.setState({ components });
        }
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Grid', specTarget, collectTarget)
export default class Renderer extends React.Component<RendererProps, RendererState> {
    state: RendererState = { components: [] };

    render() {
        return (
            this.props.connectDropTarget(
                <div className='Renderer'>
                    {
                        this.state.components.map((component, index) => {
                            const id = 'structure-' + (index + 1);
                            return React.createElement(
                                (Components as any)[component.name],
                                {
                                    key: id,
                                    id,
                                    rendered: true,
                                    onRemove: this.remove,
                                    ...assign({}, component.properties)
                                }
                            )
                        })
                    }
                </div>
            )
        )
    }

    private remove = (component: any) => {
        this.setState(prevState => ({ components: filter(prevState.components, (x: any, index: number) => ('structure-' + (index + 1)) !== component.props.id) }));
    };
}
