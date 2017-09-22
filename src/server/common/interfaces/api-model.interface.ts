import { Schema, Model, Document } from 'mongoose';

export interface ApiModel {
  schema: Schema;
  get(): Model<Document>;
}
