import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Components from './toolbox/index';

export interface RendererProps {
    connectDropTarget?: any;
    addComponent?: (component: any) => void;
    onClick?: (component: any) => void;
}

const boxTarget = {
    drop(props: any, monitor: any, component: any) {
        component.addComponent(monitor.getItem())
    },
};

const collect = (connect: any, monitor: any) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class Renderer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = { components: [] };
    }

    addComponent(component: any) {
        const components = this.state.components.concat(
            React.createElement(
                (Components as any)[component.name],
                {
                    key: 'component-' + (this.state.components.length + 1),
                    rendered: true,
                    onClick: this.props.onClick
                })
        );

        this.setState({ components });
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

(Renderer as any).propTypes = {
    connectDragSource: PropTypes.func,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    addComponent: PropTypes.func
};

export default DropTarget('Component', boxTarget, collect)(Renderer);
