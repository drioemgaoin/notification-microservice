import { handleActions, Action } from 'redux-actions';
import { assign } from 'lodash';

import {
    SELECT_COMPONENT,
    HIGHLIGHT_COMPONENT
} from './action';

export interface IState {
    selected: string;
    highlighted: any;
}

export const initialState: any = {
    selected: undefined,
    highlighted: {}
};

const select = (state: IState, action: Action<any>) => {
    return assign({}, state, { selected: action.payload === state.selected ? undefined : action.payload });
};

const highlight = (state: IState, action: Action<any>) => {
    return assign({}, state, { highlighted: { [action.payload]: state.highlighted[action.payload] ? undefined : action.payload } });
};

export default handleActions<any, any>(
    {
        [SELECT_COMPONENT]: select,
        [HIGHLIGHT_COMPONENT]: highlight
    },
    initialState
);
