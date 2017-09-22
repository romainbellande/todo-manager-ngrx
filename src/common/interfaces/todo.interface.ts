import { Endpoint } from './endpoint.interface';

import { Entity } from './entity.interface';
import { Category } from './category.interface';
export interface Todo extends Entity {
  title: string;
  description: string;
  isChecked: boolean;
  category: any;
}

export const todoEndpoint: Endpoint = {
  name: 'todo'
};
