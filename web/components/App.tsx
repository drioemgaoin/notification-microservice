import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Panel from './Panel';
import Toolbox from './Toolbox';
import Renderer from './Renderer';
import Properties from './Properties';
import Ruler from './Ruler';

class App extends React.Component<any, any> {
    private onClickBound = this.onClick.bind(this);
    private onValidateBound = this.validate.bind(this);
    private onCancelBound = this.cancel.bind(this);

    constructor(props: any) {
        super(props);

        this.state = { properties: [] };
    }

    render() {
        return (
            <div className='App'>
                <div className='App__header'>
                    <h2>Notification UI</h2>
                </div>
                <div className='App__body'>
                    {
                        this.state.properties.length > 0 &&
                        (
                            <Properties properties={this.state.properties}
                                        onValidate={this.onValidateBound}
                                        onCancel={this.onCancelBound} />
                        )
                    }
                    <Panel opened={true}>
                        <Toolbox />
                    </Panel>

                    <Renderer onClick={this.onClickBound} />
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }

    private onClick(properties: any, callback: any) {
        this.setState({ properties, callback });
    }

    private cancel() {
        this.setState({ properties: [] });
    }

    private validate(values: any) {
        this.setState({ properties: [] });
        this.state.callback(values);
    }
}

export default DragDropContext(HTML5Backend)(App);
