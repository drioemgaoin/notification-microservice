import * as React from 'react';
import * as PubSub from 'pubsub-js';
import * as bem from 'bem-classname';
import { DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick } from 'lodash';

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
    private static DEFAULT_HEIGHT = 70;

    private ghost: any;

    static defaultProps = {
        value: 'I\'m a new Text block ready for your content.'
    }

    constructor(props: TextProps) {
        super(props);

        this.state = {
            value: props.value        
        };
    }

    componentDidMount() {
        this.setFilledHeight();
    }

    render() {
        return (
            <Container 
                id={this.props.id}
                handlers={this.props.actions}
            >
                <textarea 
                    className='text text--dragged'
                    style={{
                        height: this.state.height || 'inherit'
                    }}
                    defaultValue={this.state.value}
                    onChange={this.change}
                    onKeyUp={this.setFilledHeight}
                > 
                </textarea>
                <div
                    className='text text--ghost'
                    ref={(c) => this.ghost = c}
                    aria-hidden='true'
                >
                    {this.state.value}
                </div>
            </Container>
        );
    }

    private change = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;
        this.setState({ value });
    }

    private setFilledHeight = () => {
        const element = this.ghost;
    
        if (element.clientHeight > Text.DEFAULT_HEIGHT) {
            this.setState({
                height: element.clientHeight,
            });
        }
    }
}

(Text as any).propTypes = {
    id: PropTypes.string,
    value: PropTypes.string
};
