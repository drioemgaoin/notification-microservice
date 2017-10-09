import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

export interface RendererProps {
    connectDropTarget?: any;
    addComponent?: (component: any) => void;
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
            React.createElement(eval(component.name), { rendered: true, key: 'component-' + (this.state.components.length + 1) })
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
