import * as React from 'react';

import Date, { DateConfigProps } from './toolbox/Date';

export default class Toolbox extends React.Component<any, any> {
    render() {
        return (
            <ol className='Toolbox'>
                <li><Date value='29/11/1982' /></li>
            </ol>
        );
    }
}
