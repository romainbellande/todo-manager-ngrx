import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Category } from '../../../../../../common/interfaces';
import { CategoryService } from '../../../core/services';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.categoryService.onEditCategory
      .subscribe(category => {
        this.createForm(category);
      });
  }

  public onSubmit(): void {
    const category: Category = this.categoryForm.value;
    if (this.categoryService.onEditCategory.value) {
      category._id = this.categoryService.onEditCategory.value._id;
      this.update(category);
    } else {
      this.create(category);
    }
  }

  private create(category: Category): void {
    this.categoryService.crud.create(category)
    .subscribe();
    this.categoryForm.setValue({ name: '' });
  }

  private createForm(category?: Category): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (category) {
      this.categoryForm.setValue({
        name: category.name
      });
    }
  }

  private update(category: Category): void {
    this.categoryService.crud.update(category)
    .subscribe(() => {
      this.categoryService.onEditCategory.next(null);
    });
  }

}
