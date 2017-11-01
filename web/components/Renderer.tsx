import * as React from 'react';
import * as PropTypes from 'prop-types';
import { forEach, assign, filter } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';

import Components from './toolbox/structureComponent';
import BorderProperties from './components/border/BorderProperties';

export interface RendererProps {
    connectDropTarget?: any;
    addComponent?: (component: any) => void;
    onClick?: (component: any) => void;
}

const specTarget: DropTargetSpec<RendererProps> = {
    drop(props: RendererProps, monitor: DropTargetMonitor, component: React.Component<RendererProps, any>) {
        const item: any = monitor.getItem();
        if (!item.rendered) {
            const id = 'component-' + (component.state.components.length + 1);
            const components = component.state.components.concat([
                React.createElement(
                    (Components as any)[item.name],
                    {
                        key: id,
                        id,
                        rendered: true,
                        selected: false,
                        onClick: component.props.onClick,
                        onRemove: (component as any).remove.bind(component),
                        ...assign({}, item.properties)
                    }
                )
            ]);

            component.setState({ components });
        }
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Grid', specTarget, collectTarget)
export default class Renderer extends React.Component<RendererProps, any> {
    constructor(props: RendererProps) {
        super(props);

        this.state = { components: [] };
    }

    render() {
        return (
            this.props.connectDropTarget(
                <div className='Renderer'>
                    { this.state.components }
                </div>
            )
        )
    }

    remove(component: any) {
        this.setState({ components: filter(this.state.components, (x: any) => x.key !== component.props.id) });
    }
}

(Renderer as any).propTypes = {};
