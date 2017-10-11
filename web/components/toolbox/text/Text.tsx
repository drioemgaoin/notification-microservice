import * as React from 'react';
import { DragSource, DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick } from 'lodash';

import getSchema from './schema';

interface TextProps extends TextDndProps {
    value?: any;
    rendered?: boolean;
    onClick: (component: any, callback: any) => void;
}

export interface TextDndProps {
    connectDragSource?: any;
}

const boxSource = {
    beginDrag(props: any) {
        return { name: 'Text' };
    }
};

const collect = (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource()
});

class Text extends React.Component<TextProps, any> {
    private onClickBound = this.onClick.bind(this);
    private onCallbackBound = this.onCallback.bind(this);

    static defaultProps = {
        value: 'Empty Text'
    }

    constructor(props: TextProps) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    render() {
        return this.props.rendered
            ? ( <div className='text' onClick={this.onClickBound}>{this.state.value}</div> )
            : ( this.props.connectDragSource(<div title='Display the text'>Text</div>) );
    }

    onCallback(values: any) {
        this.setState({
            value: values['value']
        });
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(getSchema(this.state), this.onCallbackBound);
        }
    }
}

(Text as any).propTypes = {
    value: PropTypes.any
};

export default DragSource('Component', boxSource, collect)(Text);
