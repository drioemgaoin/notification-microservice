import * as React from 'react';

import ContentPanel from './components/content-panel/index';
import StructurePanel from './components/structure-panel/index';
import BodyPanel from './components/body-panel/index';
import ActionPanel from './components/action-panel/index';

export default class Toolbox extends React.Component<any, any> {
    render() {
        return (
            <div className='Toolbox'>
                {this.props.category === 'content' && (<ContentPanel />)}
                {this.props.category === 'structure' && (<StructurePanel />)}
                {this.props.category === 'body' && (<BodyPanel />)}
                {this.props.category === 'action' && (<ActionPanel actions={this.props.actions} />)}
            </div>
        );
    }
}
