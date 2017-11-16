import * as React from 'react';

import Date from '../../toolbox/date/Date';
import List from '../../toolbox/list/List';
import Text from '../../toolbox/draggable/text/index';

const ContentPanel: React.SFC<any> = props => {
    return (
        <ol>
            <li><Date /></li>
            <li><List /></li>
            <li><Text /></li>
        </ol>
    )
};

export default ContentPanel;
