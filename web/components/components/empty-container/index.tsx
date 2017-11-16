import * as React from 'react';
import * as cx from 'classnames';

interface EmptyContainerProps {
    className: string;
    style: any;
}

const EmptyContainer: React.SFC<EmptyContainerProps> = props => {
    const className = cx('empty-container', props.className);
    return (
        <div className={className}
            style={props.style}>
            No content here. Drag new from 'Content' panel.
        </div>
    )
};

export default EmptyContainer;
