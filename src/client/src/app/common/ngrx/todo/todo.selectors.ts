import { createFeatureSelector, createSelector, Store, MemoizedSelector } from '@ngrx/store';

import { TodoState } from './todo.states';
import { getAppState } from '../states';
import { Todo } from '../../../../../../common/interfaces';

export const getTodoState = createFeatureSelector<TodoState>('todo');

export const getTodoEntitiesState: MemoizedSelector<object, Todo[]> = createSelector(
  getTodoState,
  state => state.ids.map(id => state.entities[id]));

export const getTodoByCategory: MemoizedSelector<object, Todo[]> = createSelector(
  getAppState,
  state => state.todo.ids
    .map(id => state.todo.entities[id])
    .filter(todo => todo.category === state.category.selectedId)
);

export const getNbTodoDoing: MemoizedSelector<object, number> = createSelector(
  getTodoState,
  state => state.ids.map(id => state.entities[id])
    .filter(todo => !todo.isChecked)
    .length
);

export const getNbTodoDone: MemoizedSelector<object, number> = createSelector(
  getTodoState,
  state => state.ids.map(id => state.entities[id])
    .filter(todo => todo.isChecked)
    .length
);
