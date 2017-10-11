import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';

import Components from './toolbox/index';

export interface RendererProps {
    connectDropTarget?: any;
    addComponent?: (component: any) => void;
    onClick?: (component: any) => void;
}

const specTarget: DropTargetSpec<RendererProps> = {
    drop(props: RendererProps, monitor: DropTargetMonitor, component: React.Component<RendererProps, any>) {
        const item: any = monitor.getItem();
        const components = component.state.components.concat(
            React.createElement(
                (Components as any)[item.name],
                {
                    key: 'component-' + (component.state.components.length + 1),
                    rendered: true,
                    onClick: component.props.onClick
                })
        );

        component.setState({ components });
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Component', specTarget, collectTarget)
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
}

(Renderer as any).propTypes = {};
