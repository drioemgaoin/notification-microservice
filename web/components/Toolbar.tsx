import * as React from 'react';
import * as bem from 'bem-classname';

interface ToolbarProps {
    item?: string;
    onChange?: (item?: string) => void;
}

interface ToolbarState {
    current?: string;
}

export default class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    private onClickBound = (item: string) => this.onClick.bind(this, item);

    constructor(props: ToolbarProps) {
        super(props);

        this.state = {
            current: props.item || ''
        };
    }

    render() {
        return (
            <div className='Toolbar'>
                <button className={bem('Toolbar__item', { active: this.state.current === 'content' })}
                    onClick={this.onClickBound('content')}>
                    Content
                </button>
                <button className={bem('Toolbar__item', { active: this.state.current === 'structure' })}
                    onClick={this.onClickBound('structure')}>
                    Structure
                </button>
            </div>
        );
    }

    private onClick(item: string) {
        const current = item === this.state.current ? undefined : item;
        this.setState({ current });

        if (this.props.onChange) {
            this.props.onChange(current);
        }
    }
}
