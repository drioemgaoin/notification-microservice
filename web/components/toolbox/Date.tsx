import * as React from 'react';
import { DragSource, DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as PropTypes from 'prop-types';

interface DateProps extends DateConfigProps {
    rendered?: boolean;
}

export interface DateConfigProps {
    value?: string;
    format?: string;
    connectDragSource?: any,
    isDragging?: boolean;
}

const boxSource = {
    beginDrag(props: any) {
        return {
            name: 'Date'
        };
    }
};

@DragSource('Component', boxSource, (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class Date extends React.Component<DateProps, any> {
    render() {
        return this.props.rendered
        ? ( <div>{this.props.value}</div> )
        : ( this.props.connectDragSource(<div title='Display the date with the expected format'>Date</div>) );
    }
}

(Date as any).propTypes = {
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    value: PropTypes.string,
    format: PropTypes.string,
};

export default Date;
