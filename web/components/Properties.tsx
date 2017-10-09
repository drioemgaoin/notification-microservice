import * as React from 'react';

export default class Properties extends React.Component<any, any> {
    static defaultProps = {
        properties: {}
    };

    render() {
        return (
            <div className='properties'>
                {
                    Object.keys(this.props.properties).map((key: any) => {
                        console.log(this.props.properties[key])
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
