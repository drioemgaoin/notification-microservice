import * as React from 'react';
import * as cx from 'classnames';

interface PanelProps {
    title?: string;
    toolbar?: any;
    className?: string;
}

const Panel: React.SFC<PanelProps> = props => {
    const className=cx('panel', props.className);
    return (
        <div className='panel'>
            <div className='panel__header'>
                {
                    props.title && (
                        <div className='panel__header__title'>
                            {props.title}
                        </div>
                    )
                }
                
                {props.toolbar}
            </div>
            <div className='panel__body'>
                {props.children}
            </div>
        </div>
    )
};

export default Panel;
