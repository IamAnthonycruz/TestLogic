import {configureStore} from '@reduxjs/toolkit';
import {rootSaga} from './sagas';

const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: () => ({}),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
