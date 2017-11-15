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
    state = { style: { border: { borderColor: 'blue' }} };

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
                        const style = { ...this.state.style, flex: 1 };
                        return (
                            <EmptyContainer
                                className='structure__content'
                                style={style}
                            />
                        );
                    })
                }
                </div>
            </Container>
        );
    }
}
