import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { TodoService, CategoryService } from '../../core/services';
import { Todo, Category } from '../../../../../common/interfaces';
import { AppState,
         fromTodo,
         fromCategory,
         TodoState,
         CategoryState } from '../../common/ngrx';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  public mod: 'doing' | 'done';
  public category: Category;
  public todos$: Store<Todo[]>;
  public categories$: Store<Category[]>;

  constructor(public todoService: TodoService,
              public categoryService: CategoryService,
              private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.todos$ = this.store.select(fromTodo.selectors.getTodoEntitiesState);
    this.categories$ = this.store.select(fromCategory.selectors.getCategoryEntitiesState);
    this.mod = this.route.snapshot.data['mod'];
    const categoryName = this.route.snapshot.url[0].path
      .toString();
    this.setCategory(categoryName);
  }

  public getRoute(category: Category): string {
    return `/todos/${ category.name.toLowerCase() }/${ this.mod }`;
  }

  public getTodos(category: Category): Observable<Todo[]> {
    return this.todos$
      .map(todos => todos.filter(todo => todo.category === category._id && this.isMod(todo, this.mod)));
  }

  public getTodosLength(category: Category): Observable<number> {
    return this.getTodos(category).map(todos => todos.length);
  }

  public setCategory(categoryName: string): void {
    this.store.dispatch({ type: fromCategory.actions.SELECT_CATEGORY_BY_NAME, payload: categoryName.toLowerCase() });
  }

  private isMod(todo: Todo, mod: 'doing' | 'done'): boolean {
    switch (mod) {
      case 'doing':
        return !todo.isChecked;
      case 'done':
        return todo.isChecked;
      default:
        return false;
    }
  }
}
