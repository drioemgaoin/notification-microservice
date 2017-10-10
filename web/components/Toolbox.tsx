import * as React from 'react';

import Date from './toolbox/date/Date';
import Select from './toolbox/select/Select';

export default class Toolbox extends React.Component<any, any> {
    render() {
        return (
            <ol className='Toolbox'>
                <li><Date /></li>
                <li><Select /></li>
            </ol>
        );
    }
}
