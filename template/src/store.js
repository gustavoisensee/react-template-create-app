import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const middleware = [];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
