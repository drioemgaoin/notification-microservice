import * as React from 'react';
import * as cx from 'classnames';
import * as bem from 'bem-classname';
import { assign, split, filter } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Components from '../../toolbox/contentComponent';
import actions from '../../../action';
import { IState } from '../../../reducer';

interface EmptyContainerDndProps {
    connectDropTarget?: any;
}

interface EmptyContainerStateToProps {
    components: any;
}

interface EmptyContainerDispatchToProps {
    actions: {
        select: (id: string) => void;
        add: (component: any) => void;
        clone: (id: string) => void;
        remove: (id: string) => void;
        addChild: (component: any) => void;
    }
}

interface EmptyContainerProps extends EmptyContainerStateToProps, EmptyContainerDispatchToProps, EmptyContainerDndProps {
    className?: string;
    id: string;
}

const specTarget: DropTargetSpec<EmptyContainerProps> = {
    drop(props: EmptyContainerProps, monitor: DropTargetMonitor, component: React.Component<EmptyContainerProps, any>) {
        const item: any = monitor.getItem();
        component.props.actions.addChild(assign({}, {...item}, { id: props.id }));
    }
};

const collectTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DropTarget('Element', specTarget, collectTarget)
class EmptyContainer extends React.Component<EmptyContainerProps, any> {
    state = { components: {} };
    
    render() {
        let className = bem('empty-container', { 
            empty: this.props.components.length === 0
        });
        className = cx(className, this.props.className);

        return this.props.connectDropTarget(
            <div className={className}>
                {
                    this.props.components.length > 0 
                    ? this.props.components.map((component: any, index: number) => {
                        return React.createElement(
                            (Components as any)[component.name],
                            {
                                key: component.id,
                                id: component.id,
                                ref: component.id,
                                actions: this.props.actions
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
            <div style={{ flex: 1, flexDirection: 'column' }}>
            {
                this.props.components.length > 0 
                    ? this.props.components.map((x: any) => {
                        const component = (this.refs[x.id] as any).decoratedComponentInstance
                        return component.getValue();
                    })
                    : null
            }
            </div>
        );
    }
}

const mapStateToProps = (state: IState, ownProps: any) => {
    const values = split(ownProps.id, '_');
    const components = state.components[values[0]].children.map((x: any) => state.components[x]);
    return {
        ...ownProps,
        components: filter(components, (x: any) => x.parentId === ownProps.id)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect<EmptyContainerStateToProps, EmptyContainerDispatchToProps>(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EmptyContainer);
