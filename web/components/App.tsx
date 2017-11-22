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
                    <WidgetTab 
                        actions={{ save: this.save }} 
                    />
                    <Renderer ref='renderer' />
                </div>
                <div className='App__footer'>
                </div>
            </div>
        );
    }

    private save = () => {
        const renderer = (this.refs['renderer'] as any).getWrappedInstance().decoratedComponentInstance;
        if (renderer) {
            var content = ReactDOMServer.renderToString(renderer.getValue());
            const mail: any = replace(htmlContent.toString(), '{content}', content);
            var file = new File([mail], "mail.html", {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(file);
        }
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

const mapStateToProps = (state: IState) => {
    return {
        component: state.selected
    };
};

export default DragDropContext(HTML5Backend)(connect<any, undefined>(mapStateToProps, undefined)(App));
