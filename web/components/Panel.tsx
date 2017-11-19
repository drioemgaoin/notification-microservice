import * as React from 'react';
import * as cx from 'classnames';

export interface PanelProps {
    opened: boolean;
    className?: string;
}

const Panel: React.SFC<PanelProps> = props => {
    const className = cx('Panel', props.className);
    return props.opened ? (
        <div className={className}>
            {props.children}
        </div>
    ) : null;
}

export default Panel;
