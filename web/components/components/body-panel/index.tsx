import * as React from 'react';

import ColorPicker from '../color-picker/index';
import Select from '../select/index';
import Field from '../field/index';
import Panel from '../panel/index';

const PanelBody: React.SFC<any> = props => {
    return (
        <Panel title='General options'>
            <Field label='Background' >
                <ColorPicker />
            </Field>
            <Field label='Content area background color' >
                <ColorPicker />
            </Field>
            <Field label='Default font'>
                <Select options={['Arial', 'Times New Roman']} />
            </Field>
            <Field label='Link color' >
                <ColorPicker />
            </Field>
        </Panel>
    )
};

export default PanelBody;
