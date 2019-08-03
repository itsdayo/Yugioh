import initialState from "./appState";
import { createStore, applyMiddleware, combineReducers, compose } from "redux"; //combineReducers,
import thunk from "redux-thunk";
import * as appReducers from "./reducers";
import { createLogger } from "redux-logger";

const reducerArgs = { ...appReducers };

const rLogger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
const reducers = combineReducers(reducerArgs);
const store = createStore(
    reducers,
    initialState, // any initial state you want to set
    composeEnhancers(applyMiddleware(rLogger, thunk))
  );

  export default store;