import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

// Cria o middleware do saga
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  // Ative apenas no ambiente de desenvolvimento
  devTools: process.env.NODE_ENV !== 'production',
});

// Executa o Saga root
sagaMiddleware.run(rootSaga);

export default store;
