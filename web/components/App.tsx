import * as React from 'react';

export class App extends React.Component<any, any> {
    render() {
        return (
            <div className='App'>
                <div className='App-header'>
                    <h2>Notification UI</h2>
                </div>
                {this.props.children}
            </div>
        );
    }
}
