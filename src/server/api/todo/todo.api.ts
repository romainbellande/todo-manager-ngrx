
import * as restify from 'restify';
import { Connection } from 'mongoose';

import { todoEndpoint } from '../../../common/interfaces';
import { Crud } from '../../common/helpers';
import { TodoDoc, TodoModel } from './todo.model';
import { ApiEntity } from '../../common/interfaces';

export class TodoApi {
  crud: Crud<TodoDoc>;
  constructor(server: restify.Server, connection: Connection) {
    const model = new TodoModel(connection);
    this.crud = new Crud<TodoDoc>(server, todoEndpoint, model.get());
    this.crud.generate();
  }
}
