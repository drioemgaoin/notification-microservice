import * as React from 'react';
import * as bem from 'bem-classname';

const Navbar: React.SFC<any> = props => {
    const getClassName = (name: string) => {
        return bem('nav-bar__nav__item', { active: name === props.active });
    };

    return (
        <div className='nav-bar'>
            <ul className='nav-bar__nav'>
              <li data-name='content' className={getClassName('content')} onClick={props.click}>Content</li>
              <li data-name='structure' className={getClassName('structure')} onClick={props.click}>Structure</li>
              <li data-name='body' className={getClassName('body')} onClick={props.click}>Body</li>
              <li data-name='action' className={getClassName('action')} onClick={props.click}>Action</li>
            </ul>
        </div>
    )
};

export default Navbar;
