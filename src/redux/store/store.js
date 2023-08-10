import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/reducers';
import rootSaga from '../saga/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;