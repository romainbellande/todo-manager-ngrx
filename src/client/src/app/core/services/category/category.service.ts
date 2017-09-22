import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category, categoryEndpoint } from '../../../../../../common/interfaces';
import { CrudService } from '../crud/crud.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {
  public onEditCategory: BehaviorSubject<Category> = new BehaviorSubject<Category>(null);
  public crud: CrudService<Category>;

  constructor(private http: HttpClient) {
    this.crud = new CrudService<Category>(http);
    this.crud.setup(categoryEndpoint, {
      enableList: true
    });
  }

  public get(categoryId: any): Category {
    console.log(categoryId);
    return this.crud.list.find(a => a._id === categoryId);
  }

  public getNbCategory(): number {
    return this.crud.list.length;
  }
}
