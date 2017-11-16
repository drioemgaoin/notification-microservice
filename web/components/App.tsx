import * as React from 'react';
import * as PubSub from 'pubsub-js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Panel from './Panel';
import Toolbox from './Toolbox';
import Renderer from './Renderer';
import Properties from './Properties';
import Ruler from './Ruler';
import StylePanel from './StylePanel';
import WidgetTab from './components/widget-tab/index';

class App extends React.Component<any, any> {
    private onValidateBound = this.validate.bind(this);
    private onCancelBound = this.cancel.bind(this);
    private onStyleChangeBound = this.onStyleChange.bind(this);
    private onStyleCloseBound = this.onStyleClose.bind(this);
    private onMenuChangeBound = this.onMenuChange.bind(this);

    constructor(props: any) {
        super(props);

        this.state = {
            properties: [],
            openStylePanel: false
        };
    }

    render() {
        return (
            <div className='App'>
                <div className='App__header'>
                    <h2>Notification UI</h2>
                </div>
                <div className='App__body'>
                    <WidgetTab />
                    <Renderer ref='renderer' />
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }

    private onStyleChange(style: any) {
        if (this.state.current) {
            this.state.current.update(style);
        }
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

    private onMenuChange(item: string) {
        this.setState({ panel: item });
    }
}

export default DragDropContext(HTML5Backend)(App);
