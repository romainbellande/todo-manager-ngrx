import * as actions from './category.actions';
import * as effects from './category.effects';
import { reducer } from './category.reducer';
import * as selectors from './category.selectors';

export const fromCategory = {
  actions,
  effects,
  reducer,
  selectors
};
