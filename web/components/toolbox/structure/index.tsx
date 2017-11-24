import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { times } from 'lodash';

import Container from '../../components/container/index';
import EmptyContainer from '../../components/empty-container/index';

interface StructureProps {
    id: string;
    index: number;
    numberOfColumns: number;
    actions: any;
}

interface StructureState {
    style: any;
}

export default class Structure extends React.Component<StructureProps, StructureState> {
    state = { 
        style: { 
            display: 'flex'
        } 
    };

    render() {
        return (
            <Container
                id={this.props.id}
                handlers={this.props.actions}
            >
                <div className='structure structure--dragged'
                    style={this.state.style}>
                {
                    times(this.props.numberOfColumns, (index: number) => {
                        const id = this.props.id + '_' + 'child-' + (index + 1);//this.props.id + '-' + index;
                        return (
                            <EmptyContainer 
                                key={id}
                                id={id}
                                ref={id}
                                className='structure__content'
                            />
                        );
                    })
                }
                </div>
            </Container>
        );
    }

    getValue() {
        return (
            <div 
                style={this.state.style}
            >
                {
                    Object.keys(this.refs).map((key: string) => {
                        const component = (this.refs[key] as any).getWrappedInstance().decoratedComponentInstance
                        return component.getValue();
                    })
                }
            </div>
        );
    }
}
