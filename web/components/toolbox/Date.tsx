import * as React from 'react';
import { DragSource, DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';

interface DateProps extends DateConfigProps {
    rendered?: boolean;
    connectDragSource?: any;
    onClick: (component: any) => void;
}

export interface DateConfigProps {
    value?: any;
    format?: string;
}

const boxSource = {
    beginDrag(props: any) {
        return { name: 'Date' };
    }
};

const collect = (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource()
});

class Date extends React.Component<DateProps, any> {
    private onClickBound = this.onClick.bind(this);

    static defaultProps = {
        value: moment(),
        format: 'DD/MM/YYYY'
    }

    render() {
        return this.props.rendered
            ? ( <div className='date' onClick={this.onClickBound}>{moment(this.props.value).format(this.props.format)}</div> )
            : ( this.props.connectDragSource(<div title='Display the date with the expected format'>Date</div>) );
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(this);
        }
    }
}

(Date as any).propTypes = {
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    value: PropTypes.any,
    format: PropTypes.string,
};

export default DragSource('Component', boxSource, collect)(Date);
