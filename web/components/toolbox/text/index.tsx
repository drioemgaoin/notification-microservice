import * as React from 'react';
import * as PubSub from 'pubsub-js';
import * as bem from 'bem-classname';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick, split, join } from 'lodash';
import Textarea from 'react-textarea-autosize';

import getSchema from './schema';
import Container from '../../components/container/index';

interface TextDndProps {
    connectDragSource?: any;
}

interface TextProps extends TextDndProps {
    id: string,
    value: string;
    actions?: any;
}

interface TextState {
    value: string;
    height?: any;
    style: any;
}

const specSource: DragSourceSpec<TextProps> = {
    beginDrag(props: TextProps) {
        return { name: 'Text' };
    }
};

const collectSource = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
});

@DragSource('Element', specSource, collectSource)
export default class Text extends React.Component<TextProps, TextState> {
    static defaultProps = {
        value: 'I\'m a new Text block ready for your content.'
    }

    constructor(props: TextProps) {
        super(props);

        this.state = {
            value: props.value,
            style: { 
                width: '100%',
                whiteSpace: 'pre-wrap'
            }   
        };
    }

    render() {
        return (
            <Container 
                id={this.props.id}
                handlers={this.props.actions}
                moveOnRightSide={true}
            >
                <Textarea 
                    className='text text--dragged'
                    defaultValue={this.state.value}
                    style={this.state.style}
                    onChange={this.change}
                /> 
            </Container>
        );
    }

    getValue() {
        return (
            <div style={this.state.style}>
                {this.state.value}
            </div>
        );
    }

    private change = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;
        this.setState({ value });
    }
}

(Text as any).propTypes = {
    id: PropTypes.string,
    value: PropTypes.string
};
