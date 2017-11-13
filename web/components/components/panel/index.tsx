import * as React from 'react';

const Panel: React.SFC<any> = props => {
    return (
        <div className='panel'>
            <div className='panel__title'>
                {props.title}
            </div>
            <div className='panel__body'>
                {props.children}
            </div>
        </div>
    )
};

export default Panel;
