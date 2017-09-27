import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TodoService, CategoryService } from '../../../core/services';
import { Todo, Category } from '../../../../../../common/interfaces';
import { TodoFormComponent } from '../../../core/components/todo-form/todo-form.component';
import { AppState } from '../../../common/ngrx';
import { fromCategory, fromTodo } from '../../../common/ngrx';

type SortType = -1 | 1 | 0;
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  // @Input() todos$: Observable<Array<Todo>>;
  @Input() mod: 'doing' | 'done';
  category$: Store<Category>;
  todos$: Store<Todo[]>;

  constructor(private todoService: TodoService,
              private categoryService: CategoryService,
              private modalService: NgbModal,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.category$ = this.store.select(fromCategory.selectors.getSelected);
    this.todos$ = this.store.select(fromTodo.selectors.getTodoByCategory);
  }

  public edit(todo: Todo): void {
    this.todoService.editTodo = todo;
    this.modalService.open(TodoFormComponent);
  }

  public filterTodos(todos: Array<Todo>): Array<Todo> {
    return todos.filter(item => this.mod === 'done' ? item.isChecked : !item.isChecked);
  }

  public getCategoryName(todo: Todo): Observable<string> {
    return this.category$
      .map(cat => cat ? cat.name : '');
  }

  public isEmpty(todos: Array<Todo>): boolean {
   return !this.filterTodos(todos).length;
  }

  public remove(todo: Todo): void {
    this.store.dispatch({ type: fromTodo.actions.REMOVE_TODO, payload: todo });
  }

  public sortTodos(todos: Array<Todo>): Array<Todo> {
    return todos.sort((a, b) => {
      return (this.compareCheck(a, b) || this.compareCreatedAt(a, b));
    });
  }

  public toggleCheck(todo: Todo): void {
    const updatedTodo: Todo = Object.assign({}, todo, { isChecked: !todo.isChecked });
    this.store.dispatch({ type: fromTodo.actions.UPDATE_TODO, payload: updatedTodo });
  }

  private booleanToInt(val: boolean): number {
    return val ? 1 : 0;
  }

  private compareCheck(a: Todo, b: Todo): SortType | number {
    const check1 = a.isChecked ? 1 : 0;
    return (this.booleanToInt(a.isChecked) - this.booleanToInt(b.isChecked));
  }

  private compareCreatedAt(a: Todo, b: Todo): SortType {
    const date1 = new Date(a.createdAt);
    const date2 = new Date(b.createdAt);
    return date1 > date2 ? 0 : date1 <= date2 ? 1 : 1;
  }
}
