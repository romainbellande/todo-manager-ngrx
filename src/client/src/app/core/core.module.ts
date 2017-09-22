import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { CrudService,
         TodoService,
         CategoryService } from './services';

import { TodoGuard } from './guards';

import { HeaderComponent,
        TodoFormComponent } from './components';

const components = [
  HeaderComponent,
  TodoFormComponent
];

const services = [
  CrudService,
  TodoService,
  CategoryService
];

const guards = [ TodoGuard ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    ...components
  ],
  providers: [
    ...services,
    ...guards
  ],
  exports: [
    ...components
  ],
  entryComponents: [TodoFormComponent]
})
export class CoreModule { }
