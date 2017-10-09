import * as React from 'react';

export default class Properties extends React.Component<any, any> {
    static defaultProps = {
        properties: {}
    };

    render() {
        const keys = Object.keys(this.props.properties);
        return keys.length > 0 &&
        (
            <div className='properties'>
                {
                    keys.map((key: any) => {
                        return (
                            <div key={key} className='properties__property'>
                                <label className='properties__property__label'>{key}</label>
                                <input className='properties__property__value' value={typeof this.props.properties[key] === 'function' ? 'FUNC' : this.props.properties[key]} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
