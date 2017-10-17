import { Action } from '@ngrx/store';
import { Category } from '../../../../../../common/interfaces';
import * as EntityActions from '../utils/entity';

class CustomActions extends EntityActions.ActionsBase {
  SELECT_BY_NAME = this.get('Select By Name');
  constructor(protected entityName) {
    super(entityName);
  }
}

export const $ = new CustomActions('category');

export class AddCategory extends EntityActions.Add<Category> {
  readonly type = $.ADD;
}

export class Load extends EntityActions.Load<Category> {
  readonly type = $.LOAD;
}

export class LoadFail extends EntityActions.LoadFail<Category> {
  readonly type = $.LOAD_FAIL;
}

export class LoadSuccess extends EntityActions.LoadSuccess<Category>  {
  readonly type = $.LOAD_SUCCESS;
}

export class Remove extends EntityActions.Remove<Category> {
  readonly type = $.REMOVE;
}

export class SelectCategory extends EntityActions.Select {
  readonly type = $.SELECT;
}

export class SelectByName implements Action {
  readonly type = $.SELECT_BY_NAME;
  constructor(public payload: string) {}
}


export class Update extends EntityActions.Update<Category> {
  readonly type = $.UPDATE;
}

export class UpdateFail extends EntityActions.UpdateFail<Category> {
  readonly type = $.UPDATE_FAIL;
}

export class UpdateSuccess extends EntityActions.Update<Category> {
  readonly type = $.UPDATE_SUCCESS;
}


export type All =
    AddCategory
  | Load
  | LoadFail
  | LoadSuccess
  | Remove
  | SelectCategory
  | SelectByName
  | Update
  | UpdateFail
  | UpdateSuccess;
