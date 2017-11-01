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
import Toolbar from './Toolbar';

class App extends React.Component<any, any> {
    private onClickBound = this.onClick.bind(this);
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
                        <Toolbar onChange={this.onMenuChangeBound} />
                        {this.state.panel && (<Toolbox category={this.state.panel} />)}
                    </Panel>
                    <Renderer ref='renderer' onClick={this.onClickBound} />
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }

    private onClick(component: any) {
        PubSub.publish('COMPONENT_SELECTED', component.props.id);
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
