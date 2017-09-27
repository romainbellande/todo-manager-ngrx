import { Action } from '@ngrx/store';
import { Todo } from '../../../../../../common/interfaces';

export const ADD_TODO            = '[TODO] Add';
export const LOAD_TODOS          = '[TODO] Load';
export const LOAD_TODOS_SUCCESS  = '[TODO] Load Success';
export const LOAD_TODOS_FAIL     = '[TODO] Load Fail';
export const REMOVE_TODO         = '[TODO] Remove';
export const REMOVE_TODO_FAIL    = '[TODO] Remove Fail';
export const REMOVE_TODO_SUCCESS = '[TODO] Remove Success';
export const SELECT_TODOS_BY_MOD = '[TODO] Select Todos By Mod';
export const SELECT_TODO         = '[TODO] Select';
export const UPDATE_TODO         = '[TODO] Update';
export const UPDATE_TODO_FAIL    = '[TODO] Update Fail';
export const UPDATE_TODO_SUCCESS = '[TODO] Update Success';

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) {}
}

export class LoadTodos implements Action {
  readonly type = LOAD_TODOS;

  constructor(public payload: Todo[]) {}
}

export class LoadTodosFail implements Action {
  readonly type = LOAD_TODOS_FAIL;

  constructor(public payload: any) {}
}

export class LoadTodosSuccess implements Action {
  readonly type = LOAD_TODOS_SUCCESS;

  constructor(public payload: Todo[]) {}
}

export class RemoveTodo implements Action {
  readonly type = REMOVE_TODO;

  constructor(public payload: Todo) {}
}

export class RemoveTodoFail implements Action {
  readonly type = REMOVE_TODO_FAIL;

  constructor(public payload: any) {}
}

export class RemoveTodoSuccess implements Action {
  readonly type = REMOVE_TODO_SUCCESS;

  constructor(public payload: Todo) {}
}

export class SelectTodosByMod implements Action {
  readonly type = SELECT_TODOS_BY_MOD;

  constructor(public payload: string) {}
}

export class SelectTodo implements Action {
  readonly type = SELECT_TODO;

  constructor(public payload: string) {}
}


export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;

  constructor(public payload: Todo) {}
}

export class UpdateTodoFail implements Action {
  readonly type = UPDATE_TODO_FAIL;

  constructor(public payload: any) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = UPDATE_TODO_SUCCESS;

  constructor(public payload: Todo) {}
}

export type All =
    AddTodo
  | LoadTodos
  | LoadTodosFail
  | LoadTodosSuccess
  | RemoveTodo
  | RemoveTodoFail
  | RemoveTodoSuccess
  | SelectTodo
  | UpdateTodo
  | UpdateTodoFail
  | UpdateTodoSuccess;


