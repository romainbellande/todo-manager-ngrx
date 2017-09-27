import * as actions from './todo.actions';
import * as effects from './todo.effects';
import { reducer } from './todo.reducer';
import * as selectors from './todo.selectors';
export { TodoState } from './todo.states';

export const fromTodo = {
  actions,
  effects,
  reducer,
  selectors
};
