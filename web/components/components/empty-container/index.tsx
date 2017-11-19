import * as React from 'react';
import * as cx from 'classnames';
import * as bem from 'bem-classname';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';

import Components from '../../toolbox/contentComponent';

interface ContainerDndProps {
    connectDropTarget?: any;
}

interface EmptyContainerProps extends ContainerDndProps {
    className: string;
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
        let className = bem('empty-container', { 
            empty: this.state.components.length === 0,
            full: this.state.components.length > 0 
        });
        className = cx(className, this.props.className);

        return this.props.connectDropTarget(
            <div className={className}>
                {
                    this.state.components.length > 0 
                    ? this.state.components.map((component, index) => {
                        const id = 'element-' + (this.state.components.length + 1);
                        return React.createElement(
                            (Components as any)[component],
                            {
                                key: id,
                                id
                            }
                        )
                    })
                    : (<span>No content here. Drag new from 'Content' panel.</span>)
                }
            </div>
        )
    }
}