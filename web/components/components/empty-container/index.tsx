import * as React from 'react';
import * as cx from 'classnames';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';

interface ContainerDndProps {
    connectDropTarget?: any;
}

interface EmptyContainerProps extends ContainerDndProps {
    className: string;
    style: any;
}

const specTarget: DropTargetSpec<EmptyContainerProps> = {
    drop(props: EmptyContainerProps, monitor: DropTargetMonitor, component: React.Component<EmptyContainerProps, any>) {
        const item: any = monitor.getItem();
        component.setState(prevState => ({ ...prevState, components: prevState.components.concat([item.name]) }));
    }
};

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Element', specTarget, collectTarget)
export default class EmptyContainer extends React.Component<EmptyContainerProps, any> {
    state = { components: [] };
    render() {
        const className = cx('empty-container', this.props.className);
        return this.props.connectDropTarget(
            <div className={className}
                style={this.props.style}>
                {
                    this.state.components.length > 0 
                    ? this.state.components.map((component, index) => {
                        const id = 'element-' + (this.state.components.length + 1);
                        return React.createElement(
                            component,
                            {
                                key: id,
                                id
                            }
                        )
                    })
                    : "No content here. Drag new from 'Content' panel."
                }
            </div>
        )
    }
}