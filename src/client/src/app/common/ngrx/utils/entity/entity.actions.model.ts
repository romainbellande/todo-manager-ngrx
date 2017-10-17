import { Action } from '@ngrx/store';

export interface ActionsList {
  ADD: string;
  LOAD: string;
  LOAD_SUCCESS: string;
  LOAD_FAIL: string;
  REMOVE: string;
  REMOVE_SUCCESS: string;
  REMOVE_FAIL: string;
  SELECT: string;
  UPDATE: string;
  UPDATE_FAIL: string;
  UPDATE_SUCCESS: string;
}

export class ActionsBase implements ActionsList {
  private base = `[${ this.entityName.toUpperCase() }] `;
  public ADD = this.get('Add');
  public LOAD = this.get('Load');
  public LOAD_SUCCESS = this.get('Load success');
  public LOAD_FAIL = this.get('Load fail');
  public REMOVE = this.get('Remove');
  public REMOVE_FAIL = this.get('Remove Fail');
  public REMOVE_SUCCESS = this.get('Remove Success');
  public SELECT = this.get('Select');
  public UPDATE = this.get('Update');
  public UPDATE_FAIL = this.get('Update Fail');
  public UPDATE_SUCCESS = this.get('Update Success');

  constructor(protected entityName: string) {}

  protected get(value): string {
    return this.base + value;
  }
}

export class Add<T> implements Action {
  readonly type;
  constructor(public payload: T) {}
}

export class Load<T> implements Action {
  readonly type;
  constructor(public payload: T[]) {}
}

export class LoadFail<T> implements Action {
  readonly type;
  constructor(public payload: any) {}
}

export class LoadSuccess<T> implements Action {
  readonly type;
  constructor(public payload: T[]) {}
}

export class Remove<T> implements Action {
  readonly type;
  constructor(public payload: T) {}
}

export class RemoveFail<T> implements Action {
  readonly type;
  constructor(public payload: any) {}
}

export class RemoveSuccess<T> implements Action {
  readonly type;
  constructor(public payload: T) {}
}

export class Select implements Action {
  readonly type;
  constructor(public payload: string) {}
}

export class Update<T> implements Action {
  readonly type;
  constructor(public payload: T) {}
}

export class UpdateFail<T> implements Action {
  readonly type;
  constructor(public payload: any) {}
}

export class UpdateSuccess<T> implements Action {
  readonly type;
  constructor(public payload: T) {}
}


