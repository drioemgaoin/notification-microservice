import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
    value: string;
    onChange?: (color: string) => void;
}

interface ColorPickerState {
    open: boolean;
    value: string;
}

export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    private onOpenBound = this.onOpen.bind(this);
    private onChangeCompleteBound = this.onChangeComplete.bind(this);
    private onClickOutsideBound = this.onClickOutside.bind(this);
    private picker: any;

    constructor(props: ColorPickerProps) {
        super(props);

        this.state = {
            value: props.value || 'transparent',
            open: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onClickOutsideBound);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutsideBound);
    }

    render() {
        return(
            <div className='color-picker'>
                {
                    this.state.open ?
                    (
                        <SketchPicker ref={element => this.picker = element}
                            color={this.state.value}
                            onChangeComplete={this.onChangeCompleteBound} />
                    ) : (
                        <div className='color-picker__control'>
                            <div className='color-picker__control__preview'
                                style={{ background: this.state.value }}
                                onClick={this.onOpenBound} />
                            <span className='color-picker__control__title'>{this.state.value}</span>
                        </div>
                    )
                }
            </div>
        );
    }

    componentWillReceiveProps(nextProps: ColorPickerProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    private onChangeComplete(color: any, e: any) {
        e.preventDefault();

        this.setState({ value: color.hex });

        if (this.props.onChange) {
            this.props.onChange(color.hex);
        }
    }

    private onOpen(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        this.setState({ open: true });
    }

    private onClickOutside(e: any) {
        e.preventDefault();

        const area = ReactDOM.findDOMNode(this.picker);
        if (this.picker && !area.contains(e.target)) {
            this.setState({ open: false });
        }
    }
}
