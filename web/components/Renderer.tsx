import * as React from 'react';
import * as PropTypes from 'prop-types';
import { forEach, assign, filter } from 'lodash';
import { DropTarget, DropTargetMonitor, DropTargetConnector, DropTargetSpec } from 'react-dnd';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Components from './toolbox/structureComponent';
import BorderProperties from './components/border/BorderProperties';
// import selectionActions from '../actions/selection';
// import { IState } from '../reducers';

interface RendererStateToProps {
    component: string;
}

interface RendererDispatchToProps {
    actions: {
        select: (id: string) => void;
    }
}

interface RendererProps { // extends RendererStateToProps, RendererDispatchToProps {
    connectDropTarget?: any;
    onClick?: (component: any) => void;
}

interface RendererState {
    components: Array<any>;
    // component?: string;
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
    constructor(props: RendererProps) {
        super(props);

        this.state = {
            components: [] //,
            // component: props.component
        };
    }

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
                                    // selected: this.state.component === id,
                                    // onClick: () => this.props.actions.select(id),
                                    onRemove: this.remove.bind(component),
                                    ...assign({}, component.properties)
                                }
                            )
                        })
                    }
                </div>
            )
        )
    }

    // componentWillUpdate(nextProps: RendererProps) {
    //     if (this.state.component !== nextProps.component) {
    //         this.setState({ component: nextProps.component });
    //     }
    // }

    remove(component: any) {
        this.setState({ components: filter(this.state.components, (x: any) => x.key !== component.props.id) });
    }
}

// const mapStateToProps = (state: IState) => {
    // return {
        // component: state.selection.component
    // };
// };
//
// const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    // return {
        // actions: bindActionCreators(selectionActions, dispatch),
    // };
// }
//
// export default connect<RendererStateToProps, RendererDispatchToProps, any>(mapStateToProps, mapDispatchToProps)(Renderer);
