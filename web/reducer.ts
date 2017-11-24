import { handleActions, Action } from 'redux-actions';
import { assign, filter, last, join, split, findIndex, slice, concat, without, omit } from 'lodash';

import {
    SELECT_COMPONENT,
    HIGHLIGHT_COMPONENT,
    ADD_COMPONENT,
    CLONE_COMPONENT,
    REMOVE_COMPONENT,
    MOVE_COMPONENT,
    ADD_CHILD_COMPONENT
} from './action';

export interface IState {
    selected: string;
    highlighted: any;
    root: string[],
    components: any;
}

export const initialState: any = {
    selected: undefined,
    highlighted: {},
    components: {},
    root: []
};

const select = (state: IState, action: Action<string>) => {
    return assign({}, state, { selected: action.payload });
};

const highlight = (state: IState, action: Action<any>) => {
    return assign({}, state, { highlighted: { [action.payload]: state.highlighted[action.payload] ? undefined : action.payload } });
};

const add = (state: IState, action: Action<any>) => {
    const id = 'structure-' + (state.root.length + 1);
    return {
        ...state,
        root: state.root.concat([id]),
        components: {
          ...state.components,
          [id]: { ...action.payload, id, children: [] }
        }
    }
};

const addChild = (state: IState, action: Action<any>) => {
    const values = split(action.payload.id, '_');
    const parent = state.components[values[0]];
    const id = values[0] + '_content-' + (parent.children.length + 1);
    return {
        ...state,
        components: {
            ...state.components,
            [id]: { ...action.payload, id, children: [], parentId: action.payload.id },
            [parent.id]: { ...parent, children: parent.children.concat([id]) }
        }
    }
};

const clone = (state: IState, action: Action<any>) => {
    // TODO: clone a content element
    const component = state.components[action.payload];
    const values = split(action.payload, '-');
    const id = slice(values, 0, values.length - 1) + '-' + (state.root.length + 1);
    
    const root = state.root.slice();
    const index = findIndex(root, x => x === action.payload);
    root.splice(index + 1, 0, id);

    return {
        ...state,
        root,
        components: {
            ...state.components,
            [id]: { ...component, id, children: [] }
        },
        selected: id, 
        highlighted: id
    }
};

const remove = (state: IState, action: Action<any>) => {
    const values = split(action.payload, '_');
    return {
        ...state,
        root: without(state.root, action.payload),
        components: {
            ...omit(state.components, [action.payload]),
            [values[0]]: { ...state.components[values[0]], children: values.length > 1 ? without(state.components[values[0]].children, action.payload) : state.components[values[0]].children }
        }
    }
};

const move = (state: IState, action: Action<any>) => {
    const hoverIndex = findIndex(state.root, (id: any) => id === action.payload.hover);
    const dragIndex = findIndex(state.root, (id: any) => id === action.payload.drag);

    const root = state.root.slice();
    root.splice(hoverIndex, 0, root.splice(dragIndex, 1)[0]);
    return {
        ...state,
        root
    };
};

export default handleActions<any, any>(
    {
        [SELECT_COMPONENT]: select,
        [HIGHLIGHT_COMPONENT]: highlight,
        [ADD_COMPONENT]: add,
        [CLONE_COMPONENT]: clone,
        [REMOVE_COMPONENT]: remove,
        [ADD_CHILD_COMPONENT]: addChild,
        [MOVE_COMPONENT]: move
    },
    initialState
);
