import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Panel from './Panel';
import Toolbox from './Toolbox';
import Renderer from './Renderer';
import Properties from './Properties';

class App extends React.Component<any, any> {
    private onClickBound = this.onClick.bind(this);

    constructor(props: any) {
        super(props);

        this.state = { properties: {} };
    }

    render() {
        return (
            <div className='App'>
                <div className='App__header'>
                    <h2>Notification UI</h2>
                </div>
                <div className='App__body'>
                    {this.state.properties && (<Properties properties={this.state.properties} />)}

                    <Panel opened={true}>
                        <Toolbox />
                    </Panel>
                    
                    <Renderer onClick={this.onClickBound}/>
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }

    private onClick(component: any) {
        this.setState({ properties: component.props });
    }
}

export default DragDropContext(HTML5Backend)(App);
