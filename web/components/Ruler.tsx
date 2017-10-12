import * as React from 'react';
import * as PropTypes from 'prop-types';
import {assign} from 'lodash';

export interface RulerProps {
}

export default class Ruler extends React.Component<RulerProps, any> {
    private ruler: any;

    constructor(props: RulerProps) {
        super(props);

        this.state = { hComponents: [], vComponents: [] };
    }

    componentDidMount() {
        const bound = this.ruler.getBoundingClientRect();

        this.setState({
            vComponents: this.getLines(bound, 'height', 'width', { borderBottom: '1px solid black'}),
            hComponents: this.getLines(bound, 'width', 'height', { display: 'inline-block', borderRight: '1px solid black' })
        });
    }

    render() {
        return (
            <div className='Ruler' ref={ element => { this.ruler = element } }>
                <div className='Ruler__corner'></div>
                <div className='Ruler__horizontal'>
                {this.state.hComponents}
                </div>
                <div className='Ruler__vertical'>
                {this.state.vComponents}
                </div>
                <div className='Ruler__container'>
                {this.props.children}
                </div>
            </div>
        )
    }

    private getLines(bound: any, sens: string, reverse: string, extra: any = {}) {
        let lines: any = [];

        var position = 10;
        while(position < bound[sens]) {

            let reverseValue = { [reverse]: position % 50 !== 0 ? position % 10 ? '30%' : '50%' : '100%' };

            lines.push(
                <div style={assign(reverseValue, { [sens]: '5px' }, extra)}></div>
            );
            position += 5;
        }

        return lines;
    }
}

(Ruler as any).propTypes = {};
