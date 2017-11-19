import * as React from 'react';
import * as cx from 'classnames';

interface ButtonProps {
    className?: string;
    label: string;
    click?: () => void;
}

const Button: React.SFC<any> = props => {
    const className= cx('button', props.className)
    return (
        <button 
            className={className}
            onClick={props.click}
        >
            {props.label}
        </button>
    );
};

export default Button;