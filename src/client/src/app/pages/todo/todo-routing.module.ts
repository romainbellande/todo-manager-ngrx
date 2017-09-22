import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoGuard } from '../../core/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'doing'
  },
  {
    path: 'doing',
    canActivate: [TodoGuard]
  },
  {
    path: 'done',
    canActivate: [TodoGuard]
  },
  {
    path: ':categoryName/doing',
    component: TodoComponent,
    data: {
      mod: 'doing'
    }
  },
  {
    path: ':categoryName/done',
    component: TodoComponent,
    data: {
      mod: 'done'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
