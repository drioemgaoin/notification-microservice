import * as React from 'react';
import { DragSource, DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { pick } from 'lodash';

import { getOptions, getValue } from './util';

interface DateProps extends DateDndProps {
    value?: any;
    format?: string;
    rendered?: boolean;
    onClick: (component: any, callback: any) => void;
}

export interface DateDndProps {
    connectDragSource?: any;
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
    private onCallbackBound = this.onCallback.bind(this);

    static defaultProps = {
        value: moment(),
        format: 'DD/MM/YYYY'
    }

    constructor(props: DateProps) {
        super(props);

        this.state = {
            value: props.value,
            format: props.format
        };
    }

    render() {
        return this.props.rendered
            ? ( <div className='date' onClick={this.onClickBound}>{moment(this.state.value).format(this.state.format)}</div> )
            : ( this.props.connectDragSource(<div title='Display the date with the expected format'>Date</div>) );
    }

    onCallback(values: any) {
        this.setState({
            value: moment(values['value']),
            format: values['format']
        });
    }

    private onClick() {
        if (this.props.onClick) {
            const context: any = this.state;
            const propTypes = (Date as any).propTypes;
            const properties = Object.keys(propTypes).map((name: string) => {
                return {
                    name,
                    value: getValue(name, context),
                    options: getOptions(name),
                    type: propTypes[name]
                };
            })

            this.props.onClick(properties, this.onCallbackBound);
        }
    }
}

(Date as any).propTypes = {
    value: PropTypes.any,
    format: PropTypes.string
};

export default DragSource('Component', boxSource, collect)(Date);
