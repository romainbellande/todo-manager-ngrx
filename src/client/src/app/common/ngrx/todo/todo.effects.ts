import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as todoActions from './todo.actions';
import { TodoService } from '../../../core/services/index';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions,
              private todoService: TodoService) {}
  @Effect()
  todoLoad$: Observable<Action> = this.actions$
    .ofType(todoActions.LOAD_TODOS)
    .switchMap((action: todoActions.LoadTodos) => this.todoService.crud
      .find()
      .map(todos => ({ type: todoActions.LOAD_TODOS_SUCCESS, payload: todos }))
      .catch(error => Observable.of({ type: todoActions.LOAD_TODOS_FAIL, payload: error })));

  @Effect()
  todoUpdate$: Observable<Action> = this.actions$
    .ofType(todoActions.UPDATE_TODO)
    .switchMap((action: todoActions.UpdateTodo) => this.todoService.crud
      .update(action.payload)
      .map(todo => ({ type: todoActions.UPDATE_TODO_SUCCESS, payload: todo }))
      .catch(error => Observable.of({ type: todoActions.UPDATE_TODO_FAIL, payload: error})));

  @Effect()
  todoRemove$: Observable<Action> = this.actions$
    .ofType(todoActions.REMOVE_TODO)
    .switchMap((action: todoActions.RemoveTodo) => this.todoService.crud
      .remove(action.payload)
      .map(todo => ({ type: todoActions.REMOVE_TODO_SUCCESS, payload: todo }))
      .catch(error => Observable.of({ type: todoActions.REMOVE_TODO_FAIL, payload: error })));
}
