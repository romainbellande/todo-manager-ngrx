import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TodoService, CategoryService } from '../../../core/services';
import { Todo, Category } from '../../../../../../common/interfaces';
import { TodoFormComponent } from '../../../core/components/todo-form/todo-form.component';

type SortType = -1 | 1 | 0;
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Array<Todo>;
  @Input() mod: 'doing' | 'done';

  constructor(private todoService: TodoService,
              private categoryService: CategoryService,
              private modalService: NgbModal) { }

  ngOnInit() {}

  public edit(todo: Todo): void {
    this.todoService.editTodo = todo;
    this.modalService.open(TodoFormComponent);
  }

  public filterTodos(todos: Array<Todo>): Array<Todo> {
    return this.todos.filter(item => this.mod === 'done' ? item.isChecked : !item.isChecked);
  }

  public getCategoryName(todo: Todo): string {
    const category = this.categoryService.crud.list.find(a => a._id === todo.category);
    return category ? category.name : '';
  }

  public remove(todo: Todo): void {
    this.todoService.crud.remove(todo)
      .subscribe();
  }

  public sortTodos(todos: Array<Todo>): Array<Todo> {
    return this.todos.sort((a, b) => {
      return (this.compareCheck(a, b) || this.compareCreatedAt(a, b));
    });
  }

  public toggleCheck(todo: Todo): void {
    todo.isChecked = !todo.isChecked;
    this.todoService.crud.update(todo)
      .subscribe();
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
