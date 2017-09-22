import { model, Model, Schema, Document, Connection } from 'mongoose';
import { Category } from '../../../common/interfaces';
import { ApiModel } from "../../common/interfaces/api-model.interface";

export interface CategoryDoc extends Category, Document {}

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export class CategoryModel implements ApiModel {
  schema: Schema = categorySchema;

  constructor(private connection: Connection) {}

  get(): Model<CategoryDoc> {
    return this.connection.model<CategoryDoc>('Category', this.schema);
  }
}
