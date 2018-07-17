import { createAction } from 'redux-actions';
import status from '../constants/status';

export const PAGE_INITIALIZE = 'initialActions/PAGE_INITIALIZE';
export const PAGE_LOADED = 'initialActions/PAGE_LOADED';

export const pageInitialize = createAction(PAGE_INITIALIZE, () => status.INITIALIZE);
export const pageLoaded = createAction(PAGE_LOADED, () => status.LOADED);
