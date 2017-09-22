import { model, Model, Schema, Document, Connection } from 'mongoose';
import { Todo } from '../../../common/interfaces';
import { ApiModel } from "../../common/interfaces/api-model.interface";

import { categorySchema } from '../category/category.model';
export interface TodoDoc extends Todo, Document {}
export class TodoModel implements ApiModel {
  schema: Schema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: String,
    link: String,
    isChecked: {
      type: Boolean,
      default: false
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  }, {
    timestamps: true
  });

  constructor(private connection: Connection) {}

  get(): Model<TodoDoc> {
    return this.connection.model<TodoDoc>('Todo', this.schema);
  }
}
