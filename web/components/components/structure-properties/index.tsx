import * as React from 'react';

import store from '../../../store';
import actions from '../../../action';
import Panel from '../panel/index';
import Field from '../field/index';
import ColorPicker from '../color-picker/index';
import PaddingProperties from '../padding/index';
import ElementToolbar from '../element-toolbar/index';

export default class StructureProperties extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Panel title='Structure Properties'
                    toolbar={this.renderToolbar()}
                >
                    <Field label='Text color' >
                        <ColorPicker />
                    </Field>
                    <Field label='Link color' >
                        <ColorPicker />
                    </Field>
                    <Panel title='Spacing'>
                        <PaddingProperties />
                    </Panel>
                </Panel>
            </div>
        );
    }

    private renderToolbar() {
        return (<ElementToolbar click={this.click} />);
    }

    private click = (actionName: string) => {
        const action = (actions as any)[actionName];
        if (action) {
            store.dispatch(action(store.getState().selected));
        }
    };
}