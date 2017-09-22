
import * as restify from 'restify';
import { Connection } from 'mongoose';

import { TodoApi } from './todo/todo.api';
import { CategoryApi } from './category/category.api';

export class Api {
    constructor(private server: restify.Server, private connection: Connection) {
      new TodoApi(server, connection);
      new CategoryApi(server, connection);
    }
}
