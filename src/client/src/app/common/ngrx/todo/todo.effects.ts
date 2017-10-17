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
  constructor(private $: Actions,
              private todoService: TodoService) {}
  @Effect()
  todoLoad$: Observable<Action> = this.$
    .ofType(todoActions.$.LOAD)
    .switchMap((action: todoActions.Load) => this.todoService.crud
      .find()
      .map(todos => ({ type: todoActions.$.LOAD_SUCCESS, payload: todos }))
      .catch(error => Observable.of({ type: todoActions.$.LOAD_FAIL, payload: error })));

  @Effect()
  todoUpdate$: Observable<Action> = this.$
    .ofType(todoActions.$.UPDATE)
    .switchMap((action: todoActions.Update) => this.todoService.crud
      .update(action.payload)
      .map(todo => ({ type: todoActions.$.UPDATE_SUCCESS, payload: todo }))
      .catch(error => Observable.of({ type: todoActions.$.UPDATE_FAIL, payload: error})));

  @Effect()
  todoRemove$: Observable<Action> = this.$
    .ofType(todoActions.$.REMOVE)
    .switchMap((action: todoActions.Remove) => this.todoService.crud
      .remove(action.payload)
      .map(todo => ({ type: todoActions.$.REMOVE_SUCCESS, payload: todo }))
      .catch(error => Observable.of({ type: todoActions.$.REMOVE_FAIL, payload: error })));
}
