import { createAction } from 'redux-actions';

export const SELECT_COMPONENT = 'SELECT_COMPONENT';
export const HIGHLIGHT_COMPONENT = 'HIGHLIGHT_COMPONENT';
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const CLONE_COMPONENT = 'CLONE_COMPONENT';
export const MOVE_COMPONENT = 'MOVE_COMPONENT';

const select = createAction(SELECT_COMPONENT);
const highlight = createAction(HIGHLIGHT_COMPONENT);
const add = createAction(ADD_COMPONENT);
const remove = createAction<string>(REMOVE_COMPONENT);
const clone = createAction<string>(CLONE_COMPONENT);
const move = createAction(MOVE_COMPONENT, (hover: string, drag: string) => ({ hover, drag }));

export default {
    select,
    highlight,
    add,
    clone,
    remove,
    move
}
