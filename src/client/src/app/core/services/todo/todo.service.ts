import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api/api.service';
import { CrudService } from '../crud/crud.service';
import { Todo, todoEndpoint } from '../../../../../../common/interfaces';

@Injectable()
export class TodoService {
  todos: Array<Todo>;
  editTodo: Todo;
  crud: CrudService<Todo>;

  constructor(http: HttpClient) {
    this.crud = new CrudService<Todo>(http);
    this.crud.setup(todoEndpoint, {
      enableList: true
    });
  }

  public hasEditTodo(): boolean {
    return !!this.editTodo;
  }

  public getNbTodo(): number {
    return this.crud.list.filter(a => !a.isChecked).length;
  }

  public getNbDone(): number {
    return this.crud.list.length - this.getNbTodo();
  }
}
