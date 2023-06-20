import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/rootReducer';

const initialState = {};
const middlewares = [thunk];
let devtools = (x) => x;

if (
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middlewares),devtools)
);
