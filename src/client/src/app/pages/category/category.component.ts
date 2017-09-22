import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../core/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {}
}
