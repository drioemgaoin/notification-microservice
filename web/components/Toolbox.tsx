import * as React from 'react';

import Date from './toolbox/date/Date';
import List from './toolbox/list/List';
import Text from './toolbox/text/Text';

export default class Toolbox extends React.Component<any, any> {
    render() {
        return (
            <ol className='Toolbox'>
                <li><Date /></li>
                <li><List /></li>
                <li><Text /></li>
            </ol>
        );
    }
}
