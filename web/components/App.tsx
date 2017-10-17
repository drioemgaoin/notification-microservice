import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Panel from './Panel';
import Toolbox from './Toolbox';
import Renderer from './Renderer';
import Properties from './Properties';
import Ruler from './Ruler';
import StylePanel from './StylePanel';

class App extends React.Component<any, any> {
    private onClickBound = this.onClick.bind(this);
    private onValidateBound = this.validate.bind(this);
    private onCancelBound = this.cancel.bind(this);
    private onStyleChangeBound = this.onStyleChange.bind(this);
    private onStyleCloseBound = this.onStyleClose.bind(this);

    constructor(props: any) {
        super(props);

        this.state = { properties: [], openStylePanel: false };
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
                    {
                        this.state.openStylePanel &&
                        (
                            <StylePanel onChange={this.onStyleChangeBound}
                                onClose={this.onStyleCloseBound} />
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

    private onClick(callback: any) {
        this.setState({ openStylePanel: true, callback });
    }

    private onStyleChange(style: any) {
        this.state.callback(style);
    }

    private cancel() {
        this.setState({ properties: [] });
    }

    private onStyleClose() {
        this.setState({ openStylePanel: false });
    }

    private validate(values: any) {
        this.setState({ properties: [] });
        this.state.callback(values);
    }
}

export default DragDropContext(HTML5Backend)(App);
