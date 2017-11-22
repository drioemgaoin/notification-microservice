import * as React from 'react';
import * as cx from 'classnames';
import * as bem from 'bem-classname';
import { assign } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';

import Components from '../../toolbox/contentComponent';

interface ContainerDndProps {
    connectDropTarget?: any;
}

interface EmptyContainerProps extends ContainerDndProps {
    className: string;
    id: string;
}

const specTarget: DropTargetSpec<EmptyContainerProps> = {
    drop(props: EmptyContainerProps, monitor: DropTargetMonitor, component: React.Component<EmptyContainerProps, any>) {
        const item: any = monitor.getItem();

        component.setState(prevState => ({
            ...prevState, 
            components: prevState.components.concat([item.name]),
            style: assign({}, { ...prevState.style }, { 'align-items': 'stretch' }) 
        }));
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
            empty: this.state.components.length === 0
        });
        className = cx(className, this.props.className);

        return this.props.connectDropTarget(
            <div 
                className={className}
            >
                {
                    this.state.components.length > 0 
                    ? this.state.components.map((component: string, index: number) => {
                        const id = this.props.id + '-' + component.toLowerCase() + '-' + index;
                        return React.createElement(
                            (Components as any)[component],
                            {
                                key: id,
                                id,
                                ref: id
                            }
                        )
                    })
                    : (<span>No content here. Drag new from 'Content' panel.</span>)
                }
            </div>
        )
    }

    getValue() {
        return (
            <div style={{ flex: 1 }}>
            {
                this.state.components.length > 0 
                    ? Object.keys(this.refs).map((key: string) => {
                        const component = (this.refs[key] as any).decoratedComponentInstance
                        return component.getValue();
                    })
                    : null
            }
            </div>
        );
    }
}