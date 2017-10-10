import * as React from 'react';

import Date from './toolbox/date/Date';
import List from './toolbox/list/List';

export default class Toolbox extends React.Component<any, any> {
    render() {
        return (
            <ol className='Toolbox'>
                <li><Date /></li>
                <li><List /></li>
            </ol>
        );
    }
}
