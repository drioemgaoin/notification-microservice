import * as React from 'react';

import Select from '../select/index';
import Field from '../field/index';
import Panel from '../panel/index';
import Button from '../button/index';

export default class ActionPanel extends React.Component<any, any> {
    render() {
        return (
            <Panel className='action-panel'>
                <Field label='Template name' >
                    <Button label='Save' click={this.save} />
                </Field>
            </Panel>
        );
    }

    private save = () => {
        const save = this.props.actions['save'];
        if (save) {
            save();
        }
    }
}