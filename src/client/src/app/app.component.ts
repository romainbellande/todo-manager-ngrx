import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoService,
         CategoryService } from './core/services';
import { AppState } from './common/ngrx/states';
import { LOAD_TODOS } from './common/ngrx/todo/todo.actions';
import { LOAD_CATEGORIES } from './common/ngrx/category/category.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private todoService: TodoService,
              private categoryService: CategoryService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch({ type: LOAD_CATEGORIES });
    this.store.dispatch({ type: LOAD_TODOS });
  }
}
