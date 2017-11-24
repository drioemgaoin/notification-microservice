import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PubSub from 'pubsub-js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { replace } from 'lodash';
import * as FileSaver from 'file-saver';
import * as ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';

import Panel from './Panel';
import Toolbox from './Toolbox';
import Renderer from './Renderer';
import Properties from './Properties';
import Ruler from './Ruler';
import StylePanel from './StylePanel';
import WidgetTab from './components/widget-tab/index';
import * as htmlContent from '../template.html';
import { IState } from '../reducer';

interface AppProps {}

interface AppState {
    category?: string;
}

class App extends React.Component<AppProps, AppState> {
    state = { category: undefined };

    render() {
        return (
            <div className='App'>
                <div className='App__header'>
                    <h2>Notification UI</h2>
                </div>
                <div className='App__body'>
                    <WidgetTab 
                        actions={{ save: this.save }} 
                        category={this.state.category}
                    />
                    <Renderer 
                        ref='renderer' 
                        onClick={this.click}
                    />
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }

    private save = () => {
        const renderer = (this.refs['renderer'] as any).getWrappedInstance().decoratedComponentInstance;
        console.log('SAVE')
        if (renderer) {
            var content = ReactDOMServer.renderToString(renderer.getValue());
            const mail: any = replace(htmlContent.toString(), '{content}', content);
            var file = new File([mail], "mail.html", {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(file);
        }
    }

    private click = (id: string, ...args: any[]) => {
        const values = id.split('-');
        this.setState({ category: values[values.length - 2] + '-properties' });
    }
}

export default DragDropContext(HTML5Backend)(App);
