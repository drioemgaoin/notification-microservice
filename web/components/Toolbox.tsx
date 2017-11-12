import * as React from 'react';

import Date from './toolbox/date/Date';
import List from './toolbox/list/List';
import Text from './toolbox/text/Text';
import Structure from './toolbox/draggable/structure/index';

export default class Toolbox extends React.Component<any, any> {
    render() {
        return (
            <div className='Toolbox'>
                <ol>
                    {
                        this.props.category === 'content' ?
                        (
                            [
                                <li><Date /></li>,
                                <li><List /></li>,
                                <li><Text /></li>
                            ]
                        ) : (
                            [
                                <li><Structure numberOfColumns={1} /></li>,
                                <li><Structure numberOfColumns={2} /></li>,
                                <li><Structure numberOfColumns={3} /></li>,
                                <li><Structure numberOfColumns={4} /></li>
                            ]
                        )
                    }
                </ol>
            </div>
        );
    }
}
