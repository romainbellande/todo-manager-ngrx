import { Endpoint } from './endpoint.interface';

import { Entity } from './entity.interface';
export interface Category extends Entity {
  name: string;
}

export const categoryEndpoint: Endpoint = {
  name: 'category',
  plural: 'categories'
};
