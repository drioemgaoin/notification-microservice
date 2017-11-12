import { createAction } from 'redux-actions';

export const SELECT_COMPONENT = 'SELECT_COMPONENT';
export const HIGHLIGHT_COMPONENT = 'HIGHLIGHT_COMPONENT';

const select = createAction(SELECT_COMPONENT);
const highlight = createAction(HIGHLIGHT_COMPONENT);

export default {
    select,
    highlight
}
