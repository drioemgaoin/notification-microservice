import * as React from 'react';

import Structure from '../../toolbox/draggable/structure/index';

const StructurePanel: React.SFC<any> = props => {
    return (
        <ol>
            <li><Structure numberOfColumns={1} /></li>
            <li><Structure numberOfColumns={2} /></li>
            <li><Structure numberOfColumns={3} /></li>
            <li><Structure numberOfColumns={4} /></li>
        </ol>
    )
};

export default StructurePanel;
