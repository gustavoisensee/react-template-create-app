import { handleActions, combineActions } from 'redux-actions';
import { PAGE_INITIALIZE, PAGE_LOADED } from '../actions/appActions';

const app = handleActions(
  {
    [combineActions(PAGE_INITIALIZE, PAGE_LOADED)]: (state, { payload }) => ({
      ...state,
      status: payload,
    }),
  },
  {
    status: null,
  },
);

export default app;
