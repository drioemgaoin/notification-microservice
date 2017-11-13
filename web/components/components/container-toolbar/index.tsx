import * as React from 'react';
import * as bem from 'bem-classname';

interface ContainerToolbarProps {
    click: (e: React.SyntheticEvent<HTMLSpanElement>) => void;
}

const ContainerToolbar: React.SFC<ContainerToolbarProps> = props => {
    const doNothing = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className='container__toolbar'
            onMouseEnter={doNothing}
            onMouseLeave={doNothing}>
            <span className='container__toolbar__icon container__toolbar__icon--remove' onClick={props.click}></span>
            <span className='container__toolbar__icon container__toolbar__icon--clone' onClick={props.click}></span>
        </div>
    );
}

export default ContainerToolbar;
