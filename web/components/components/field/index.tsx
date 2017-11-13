import * as React from 'react';

const Field: React.SFC<any> = props => {
    return (
        <div className='field'>
            <div className='field__title'>{props.label}</div>
            <div className='field__content'>{props.children}</div>
        </div>
    )
}

export default Field;
