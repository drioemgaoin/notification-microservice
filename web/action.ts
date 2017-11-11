import { createAction } from 'redux-actions';

export const SELECT_COMPONENT = 'SELECT_COMPONENT';
export const HOVER_COMPONENT = 'HOVER_COMPONENT';

const select = createAction(SELECT_COMPONENT);
const hover = createAction(HOVER_COMPONENT);

export default {
    select,
    hover
}
