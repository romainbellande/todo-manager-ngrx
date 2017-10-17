import { Action } from '@ngrx/store';

import * as EntityActions from '../utils/entity';
import { Todo } from '../../../../../../common/interfaces';

class CustomActions extends EntityActions.ActionsBase {
  SELECT_TODOS_BY_MOD = this.get('Select Todos By Mod');
  constructor(protected entityName) {
    super(entityName);
  }
}

export const $ = new CustomActions('todo');

export class Add extends EntityActions.Add<Todo> {
  readonly type = $.ADD;
}

export class Load extends EntityActions.Load<Todo> {
  readonly type = $.LOAD;
}

export class LoadFail extends EntityActions.LoadFail<Todo> {
  readonly type = $.LOAD_FAIL;
}

export class LoadSuccess extends EntityActions.LoadSuccess<Todo> {
  readonly type = $.LOAD_SUCCESS;
}

export class Remove extends EntityActions.Remove<Todo> {
  readonly type = $.REMOVE;
}

export class RemoveFail extends EntityActions.RemoveFail<Todo> {
  readonly type = $.REMOVE_FAIL;
}

export class RemoveSuccess extends EntityActions.RemoveSuccess<Todo> {
  readonly type = $.REMOVE_SUCCESS;
}

export class SelectTodosByMod implements Action {
  readonly type = $.SELECT_TODOS_BY_MOD;
  constructor(public payload: string) {}
}

export class Select extends EntityActions.Select {
  readonly type = $.SELECT;
}


export class Update extends EntityActions.Update<Todo> {
  readonly type = $.UPDATE;
}

export class UpdateFail extends EntityActions.UpdateFail<Todo> {
  readonly type = $.UPDATE_FAIL;
}

export class UpdateSuccess extends EntityActions.UpdateSuccess<Todo> {
  readonly type = $.UPDATE_SUCCESS;
}

export type All =
    Add
  | Load
  | LoadFail
  | LoadSuccess
  | Remove
  | RemoveFail
  | RemoveSuccess
  | Select
  | Update
  | UpdateFail
  | UpdateSuccess;
