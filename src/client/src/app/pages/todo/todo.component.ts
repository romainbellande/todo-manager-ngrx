import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { TodoService, CategoryService } from '../../core/services';
import { Todo, Category } from '../../../../../common/interfaces';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  mod: 'doing' | 'done';
  category: Category;
  constructor(public todoService: TodoService,
              public categoryService: CategoryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.mod = this.route.snapshot.data['mod'];
  }

  private getCategory(): Category {
    const categoryName = this.route.snapshot.url[0].path
    .toString()
    .toLocaleLowerCase();
    let category: Category = this.categoryService.crud.list.find(a => a.name.toLowerCase() === categoryName);
    if (!category) {
      category = this.categoryService.crud.list[0];
    }
    return category;
  }

  public getRoute(category: Category): string {
    return `/todos/${ category.name.toLowerCase() }/${ this.mod }`;
  }

  public getTodos(category: Category): Array<Todo> {
    return this.todoService.crud.list.filter(a => a.category === category._id && this.isMod(a, this.mod));
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
