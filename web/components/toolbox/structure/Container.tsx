import * as React from 'react';
import * as classNames from 'classnames';
import { assign } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';

import Components from '../../toolbox/contentComponent';

interface ContainerProps extends StructureDndProps {
    className?: string;
    style: any;
}

interface StructureDndProps {
    connectDropTarget?: any;
}

interface ContainerState {
    style: any;
    component?: any;
}

const specTarget: DropTargetSpec<ContainerProps> = {
    drop(props: ContainerProps, monitor: DropTargetMonitor, component: React.Component<ContainerProps, ContainerState>) {
        const item: any = monitor.getItem();
        if (!item.rendered) {
            const element = React.createElement(
                    (Components as any)[item.name],
                    {
                        key: 'component',
                        rendered: true,
                        ...assign({}, item.properties)
                    });

            component.setState({ component: element });
        }
    }
}

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Element', specTarget, collectTarget)
export default class Container extends React.Component<ContainerProps, ContainerState> {
     constructor(props: ContainerProps) {
        super(props);

        this.state = { style: props.style };
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
    }

    render() {
        const className = classNames('container', this.props.className);
        return this.props.connectDropTarget(
            <div className={this.props.className} style={this.state.style}>
                {
                    this.state.component 
                    ? this.state.component
                    : ( <span>No content here. Drag component from the toolbox.</span> )
                }
                
            </div>
        );
    }
}