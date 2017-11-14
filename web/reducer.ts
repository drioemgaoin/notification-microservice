import { handleActions, Action } from 'redux-actions';
import { assign, filter, last, join, split, findIndex, slice, concat } from 'lodash';

import {
    SELECT_COMPONENT,
    HIGHLIGHT_COMPONENT,
    ADD_COMPONENT,
    CLONE_COMPONENT,
    REMOVE_COMPONENT
} from './action';

export interface IState {
    selected: string;
    highlighted: any;
    components: any[];
}

export const initialState: any = {
    selected: undefined,
    highlighted: {},
    components: []
};

const select = (state: IState, action: Action<string>) => {
    return assign({}, state, { selected: action.payload === state.selected ? undefined : action.payload });
};

const highlight = (state: IState, action: Action<any>) => {
    return assign({}, state, { highlighted: { [action.payload]: state.highlighted[action.payload] ? undefined : action.payload } });
};

const add = (state: IState, action: Action<any>) => {
    return assign({}, state, { components: state.components.concat([action.payload]) });
};

const clone = (state: IState, action: Action<string>) => {
    const index = findIndex(state.components, (component: any) => component.id === action.payload);
    const component = state.components[index];
    const values = split(last(state.components).id, '/[-]+/g');
    const id = values[0] + '-' + (values[1] + 1);
    const components = concat(
        slice(state.components, 0, index + 1),
        [assign({}, component, { id })],
        slice(state.components, index + 1)
    );
    return assign({}, state, { components, selected: id, highlighted: id });
};

const remove = (state: IState, action: Action<string>) => {
    const components = filter(state.components, (component: any) => component.id !== action.payload);
    return assign({}, state, { components });
};

export default handleActions<any, any>(
    {
        [SELECT_COMPONENT]: select,
        [HIGHLIGHT_COMPONENT]: highlight,
        [ADD_COMPONENT]: add,
        [CLONE_COMPONENT]: clone,
        [REMOVE_COMPONENT]: remove
    },
    initialState
);
