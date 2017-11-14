import * as React from 'react';

interface PanelProps {
    title: string;
    toolbar?: any;
}

const Panel: React.SFC<PanelProps> = props => {
    return (
        <div className='panel'>
            <div className='panel__header'>
                <div className='panel__header__title'>
                    {props.title}
                </div>
                {props.toolbar}
            </div>
            <div className='panel__body'>
                {props.children}
            </div>
        </div>
    )
};

export default Panel;
