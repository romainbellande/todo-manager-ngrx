import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoService,
         CategoryService } from './core/services';
import { AppState } from './common/ngrx/states';
import { fromTodo } from './common/ngrx/todo';
import { fromCategory } from './common/ngrx/category';

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
    this.store.dispatch({ type: fromCategory.actions.$.LOAD });
    this.store.dispatch({ type: fromTodo.actions.$.LOAD });
  }
}
