import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Todo, Category } from '../../../../../../common/interfaces';
import { TodoService, CategoryService } from '../../../core/services';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      transition('inactive => active', animate(250)),
      transition('active => inactive', animate(250))
    ])
  ]
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  isSuccessMsgDisplayed = false;
  fadeInState: 'active' | 'inactive' = 'inactive';

  constructor(private todoService: TodoService,
              public categoryService: CategoryService,
              private fb: FormBuilder,
              private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.createForm();
    if (this.todoService.hasEditTodo()) {
      const todo = this.todoService.editTodo;
      this.todoForm.setValue({
        title: todo.title,
        description: todo.description,
        category: todo.category || ''
      });
    }
  }

  public getCategories(): Array<Category> {
    return this.categoryService.crud.list;
  }

  public onSubmit(): void {
    const todo: Todo = this.todoForm.value;
    if (this.todoService.hasEditTodo()) {
      todo._id = this.todoService.editTodo._id;
      this.edit(todo);
      this.todoService.editTodo = null;
    } else {
      this.create(todo);
    }
  }

  private close() {
    this.activeModal.close();
  }

  private create(todo: Todo): void {
    this.todoService.crud.create(todo)
    .subscribe(this.close.bind(this));
  }

  private createForm() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  private edit(todo: Todo): void {
    this.todoService.crud.update(todo)
      .subscribe(this.close.bind(this));
  }

  private toggleMsg() {
    this.isSuccessMsgDisplayed = !this.isSuccessMsgDisplayed;
  }
}
