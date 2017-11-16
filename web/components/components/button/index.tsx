import * as React from 'react';

interface ButtonIconProps {
    click: (e: React.SyntheticEvent<HTMLSpanElement>) => void;
}

const ButtonIcon: React.SFC<ButtonIconProps> = props => {
    return (
        <span className='button-icon' onClick={props.click}></span>
    );
};

export default ButtonIcon;
