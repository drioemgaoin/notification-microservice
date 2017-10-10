import * as React from 'react';
import { DragSource, DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as PropTypes from 'prop-types';

interface SelectProps extends SelectDndProps {
    rendered?: boolean;
    options: any[];
    onClick: (component: any) => void;
}

export interface SelectDndProps {
    connectDragSource?: any;
}

const boxSource = {
    beginDrag(props: any) {
        return { name: 'Select' };
    }
};

const collect = (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource()
});

class Select extends React.Component<SelectProps, any> {
    private onClickBound = this.onClick.bind(this);

    static defaultProps = {
        options: []
    }

    render() {
        return this.props.rendered
            ? this.renderComponent()
            : ( this.props.connectDragSource(<div title='Display the list of values'>Select</div>) );
    }

    private renderComponent() {
        return (
            <select className='select' onClick={this.onClickBound}>
            {
                this.props.options.map((option: any) => {
                    return <option>{option}</option>;
                })
            }
            </select>
        );
    }

    private onClick() {
        if (this.props.onClick) {
            const context: any = this.props;
            const propTypes = (Select as any).propTypes;
            const properties = Object.keys(propTypes).map((name: string) => {
                return {
                    name,
                    value: context[name],
                    type: propTypes[name]
                };
            })

            this.props.onClick(properties);
        }
    }
}

(Select as any).propTypes = {
    value: PropTypes.any,
    options: PropTypes.array.isRequired
};

export default DragSource('Component', boxSource, collect)(Select);
