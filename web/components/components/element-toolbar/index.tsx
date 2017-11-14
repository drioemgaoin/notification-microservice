import * as React from 'react';

const ElementToolbar: React.SFC<any> = props => {
    const click = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        
        const action = e.currentTarget.dataset['name'];
        if (action) {
            props.click(action);
        }
    };
    
    return (
        <div className='element-toolbar'>
            <span data-name='remove' className='element-toolbar__icon element-toolbar__icon--remove' onClick={click}></span>
            <span data-name='clone' className='element-toolbar__icon element-toolbar__icon--clone' onClick={click}></span>
            <span data-name='close' className='element-toolbar__icon element-toolbar__icon--close' onClick={click}></span>
        </div>
    );
}

export default ElementToolbar;