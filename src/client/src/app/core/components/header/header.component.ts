import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService, CategoryService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nbTodo: number;
  nbDone: number;
  constructor(private modalService: NgbModal,
              public todoService: TodoService,
              public categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.nbTodo = this.todoService.crud.list.filter(a => !a.isChecked).length;
    this.nbDone = this.todoService.crud.list.length - this.nbTodo;
  }

  public isActive(mod: 'doing' | 'done') {
    return !!this.router.url.match(`\/todos\/[a-z0-9]+\/${ mod }`);
  }

  public openTodoForm() {
    this.modalService.open(TodoFormComponent);
  }
}
