import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../../../../../common/interfaces';
import { CategoryService } from '../../../core/services/index';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() categories: Array<Category>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  public edit(category: Category): void {
    this.categoryService.onEditCategory.next(category);
  }

  public isEditMod(category: Category): boolean {
    const onEditCategory = this.categoryService.onEditCategory;
    return onEditCategory.value ? onEditCategory.value._id === category._id : false;
  }

  public remove(category: Category): void {
    this.categoryService.crud.remove(category)
      .subscribe();
  }

  public undo() {
    this.categoryService.onEditCategory.next(null);
  }
}
