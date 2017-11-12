import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as bem from 'bem-classname';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import actions from '../../../action';
import { IState } from '../../../reducer';
import ContainerToolbar from '../container-toolbar/index';
import ButtonIcon from '../button/index';

interface ContainerStateToProps {
    selected: boolean;
    highlighted: boolean;
}

interface ContainerDispatchToProps {
    actions: {
        select: (id: string) => void;
        highlight: (id: string) => void;
    }
}

interface ContainerProps extends ContainerStateToProps, ContainerDispatchToProps {
    id: string;
}

class Container extends React.Component<ContainerProps, any> {
    render() {
        const className = bem('container', {
            selected: this.props.selected,
            highlighted: this.props.highlighted,
            dragged: true
        });

        return (
            <div
                className={className}
                onClick={this.select}
                onMouseEnter={this.highlight}
                onMouseLeave={this.highlight}
            >
                {
                    (this.props.highlighted  || this.props.selected) &&
                    (
                        <span
                            className='container__icon--move'
                            onClick={this.move}
                        />
                    )
                }
                {
                    this.props.selected &&
                    (
                        <ContainerToolbar click={this.click} />
                    )
                }
                {this.props.children}
            </div>
        )
    }

    private click = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('ACTION EXECUTING');
    }

    private move = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('MOVE COMPONENT');
    }

    private select = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.select(this.props.id || '');
    }

    private highlight = (e: React.SyntheticEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.highlight(this.props.id || '');
    }
}

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        selected: state.selected === ownProps.id,
        highlighted: state.highlighted[ownProps.id] !== undefined
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect<ContainerStateToProps, ContainerDispatchToProps>(
    mapStateToProps,
    mapDispatchToProps
)(Container);
