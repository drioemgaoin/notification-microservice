import { handleActions, Action } from 'redux-actions';
import { assign } from 'lodash';

import {
    SELECT_COMPONENT,
    HOVER_COMPONENT
} from './action';

export interface IState {
    selected: string;
    hover: string;
}

export const initialState: any = {
    selected: undefined,
    hover: undefined
};

const selectComponent = (state: IState, action: Action<any>) => {
    return assign({}, state, { selected: action.payload === state.selected ? undefined : action.payload });
};

const hoverComponent = (state: IState, action: Action<any>) => {
    return assign({}, state, { hover: action.payload === state.hover ? undefined : action.payload });
};

export default handleActions<any, any>(
    {
        [SELECT_COMPONENT]: selectComponent,
        [HOVER_COMPONENT]: hoverComponent
    },
    initialState
);
