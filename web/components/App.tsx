import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Panel from './Panel';
import Toolbox from './Toolbox';
import Renderer from './Renderer';

class App extends React.Component<any, any> {
    render() {
        return (
            <div className='App'>
                <div className='App__header'>
                    <h2>Notification UI</h2>
                </div>
                <div className='App__body'>
                    <Panel opened={true}>
                        <Toolbox />
                    </Panel>
                    <Renderer />
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
