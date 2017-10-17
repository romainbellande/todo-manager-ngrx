import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import { $ } from './category.actions';
import { CategoryService } from '../../../core/services';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions,
              private categoryService: CategoryService) {}
  @Effect()
  categoryLoad$: Observable<Action> = this.actions$
    .ofType($.LOAD)
    .switchMap(action => this.categoryService.crud
      .find()
      .map(categories => ({ type: $.LOAD_SUCCESS, payload: categories }))
      .catch(() => Observable.of({ type: $.LOAD_FAIL })));
}
