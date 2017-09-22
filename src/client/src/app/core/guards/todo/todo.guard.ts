import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../../services';

@Injectable()
export class TodoGuard implements CanActivate {
  constructor(private router: Router,
              private categoryService: CategoryService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const firstCategory = this.categoryService.crud.list[0].name.toLowerCase();
    const mod = next.url.find(a => a.path === 'doing' || a.path === 'done').path;
    this.router.navigate([ `/todos/${ firstCategory }/${ mod }`]);
    return true;
  }
}
