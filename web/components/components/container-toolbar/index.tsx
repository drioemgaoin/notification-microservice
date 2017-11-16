import * as React from 'react';
import * as bem from 'bem-classname';

interface ContainerToolbarProps {
    click: (action: string) => void;
}

const ContainerToolbar: React.SFC<ContainerToolbarProps> = props => {
    const doNothing = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const click = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const action = e.currentTarget.dataset['name'];
        if (action) {
            props.click(action);
        }
    }

    return (
        <div className='container__toolbar'
            onMouseEnter={doNothing}
            onMouseLeave={doNothing}>
            <span data-name='remove' className='container__toolbar__icon container__toolbar__icon--remove' onClick={click}></span>
            <span data-name='clone' className='container__toolbar__icon container__toolbar__icon--clone' onClick={click}></span>
        </div>
    );
}

export default ContainerToolbar;
