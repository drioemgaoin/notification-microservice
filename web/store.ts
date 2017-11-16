import { createStore } from 'redux';

import notificationApp from './reducer';

const store = createStore(notificationApp);

export default store;
