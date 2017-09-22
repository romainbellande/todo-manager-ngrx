import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Endpoint } from '../../../../../../common/interfaces';
import { CoreConfig } from '../../../../../../common/config/core.config';
import { CrudService } from '../crud/crud.service';

@Injectable()
export abstract class ApiService<T> {

}
