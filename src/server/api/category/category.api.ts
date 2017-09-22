
import * as restify from 'restify';
import { Connection } from 'mongoose';

import { categoryEndpoint } from '../../../common/interfaces';
import { Crud } from '../../common/helpers';
import { CategoryDoc, CategoryModel } from './category.model';
import { ApiEntity } from '../../common/interfaces';

export class CategoryApi {
  crud: Crud<CategoryDoc>;
  constructor(server: restify.Server, connection: Connection) {
    const model = new CategoryModel(connection);
    this.crud = new Crud<CategoryDoc>(server, categoryEndpoint, model.get());
    this.crud.generate();
  }
}
