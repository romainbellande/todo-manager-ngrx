import { Action } from '@ngrx/store';
import { Category } from '../../../../../../common/interfaces';

export const ADD_CATEGORY            = '[CATEGORY] Add';
export const LOAD_CATEGORIES          = '[CATEGORY] Load';
export const LOAD_CATEGORIES_SUCCESS  = '[CATEGORY] Load Success';
export const LOAD_CATEGORIES_FAIL     = '[CATEGORY] Load Fail';
export const REMOVE_CATEGORY         = '[CATEGORY] Remove';
export const SELECT_CATEGORY         = '[CATEGORY] Select';
export const SELECT_CATEGORY_BY_NAME         = '[CATEGORY] Select by name';
export const UPDATE_CATEGORY         = '[CATEGORY] Update';


export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: Category) {}
}

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;

  constructor(public payload: Category[]) {}
}

export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;

  constructor(public payload: Category[]) {}
}

export class RemoveCategory implements Action {
  readonly type = REMOVE_CATEGORY;

  constructor(public payload: Category) {}
}

export class SelectCategory implements Action {
  readonly type = SELECT_CATEGORY;

  constructor(public payload: string) {}
}

export class SelectCategoryByName implements Action {
  readonly type = SELECT_CATEGORY_BY_NAME;

  constructor(public payload: string) {}
}


export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;

  constructor(public payload: Category) {}
}


export type All =
    AddCategory
  | LoadCategories
  | LoadCategoriesFail
  | LoadCategoriesSuccess
  | RemoveCategory
  | SelectCategory
  | SelectCategoryByName
  | UpdateCategory;
