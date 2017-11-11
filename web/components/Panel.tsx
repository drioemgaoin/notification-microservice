import * as React from 'react';

export interface IPanelProps {
    opened: boolean;
}

const Panel: React.SFC<IPanelProps> = props => {
    return props.opened ? (
        <div className='Panel'>
            {props.children}
        </div>
    ) : null;
}

export default Panel;
