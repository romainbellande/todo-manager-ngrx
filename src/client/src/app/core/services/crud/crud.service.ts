import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Endpoint, Entity } from '../../../../../../common/interfaces';
import { CoreConfig } from '../../../../../../common/config/core.config';
import { CrudOptions } from '../../../common/interfaces';

@Injectable()
export class CrudService<T extends Entity> {
  endpoint: Endpoint;
  options: CrudOptions;
  list: Array<T>;

  constructor(private http: HttpClient) {}

  public setup(endpoint: Endpoint, options?: CrudOptions) {
    this.endpoint = endpoint;
    this.options = options;
    this.list = this.options && this.options.enableList ? [] : null;
  }

  public find(): Observable<Array<T>> {
    return this.http.get(this.getEndpoint())
    .map((res: Array<T>) => {
      if (this.list) {
        this.list = res;
      }
      return res;
    });
  }

  public create(body: T): Observable<T> {
    return this.http.post(this.getEndpoint(), body)
      .map((res: T) => {
        if (this.list) {
          this.list.push(res);
        }
        return res;
      });
  }

  public isEmpty(): boolean {
    return !!(this.list && this.list.length);
  }


  public remove(body: T): Observable<T> {
    return this.http.delete(this.getEndpoint(body))
      .map((res: T) => {
        if (this.list) {
          const index = this.list.findIndex(item => item._id === res._id);
          this.list.splice(index, 1);
        }
        return res;
      });
  }

  public update(body: T): Observable<T> {
    return this.http.patch(this.getEndpoint(body), body)
      .map((res: T) => {
        if (this.list) {
          const index = this.list.findIndex(item => item._id === res._id);
          Object.assign(this.list[index], res);
        }
        return res;
      });
  }

  private getEndpoint(body?: T) {
    const path =  '/' + (this.endpoint.plural || this.endpoint.name + 's') + (body ? `/${ body._id }` : '');
    return CoreConfig.BASE_API + path;
  }
}
