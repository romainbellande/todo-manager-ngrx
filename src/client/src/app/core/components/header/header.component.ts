import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService, CategoryService } from '../../services';
import { AppState, fromTodo, fromCategory } from '../../../common/ngrx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public nbTodoDoing: Store<number>;
  public nbTodoDone: Store<number>;
  public nbCategory: Store<number>;

  constructor(private modalService: NgbModal,
              public todoService: TodoService,
              public categoryService: CategoryService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.nbTodoDoing = this.store.select(fromTodo.selectors.getNbTodoDoing);
    this.nbTodoDone = this.store.select(fromTodo.selectors.getNbTodoDone);
    this.nbCategory = this.store.select(fromCategory.selectors.getNbCategory);
  }

  public isActive(mod: 'doing' | 'done') {
    return !!this.router.url.match(`\/todos\/[a-z0-9]+\/${ mod }`);
  }

  public openTodoForm() {
    this.modalService.open(TodoFormComponent);
  }
}
