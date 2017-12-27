import { rootEpic,rootReducer} from "./root";
import { createEpicMiddleware } from 'redux-observable';
import {createStore,applyMiddleware,compose} from 'redux';


const epicMiddleware = createEpicMiddleware(rootEpic);
/*export const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );


  return store;
}
