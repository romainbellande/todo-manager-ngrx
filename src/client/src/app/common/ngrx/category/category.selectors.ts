import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState } from '../utils/entity';
import { Category } from '../../../../../../common/interfaces';

export const getCategoryState = createFeatureSelector<EntityState<Category>>('category');

export const getCategoryEntitiesState = createSelector(
  getCategoryState,
  state => state.ids.map(id => state.entities[id]));

export const getSelected = createSelector(
  getCategoryState,
  state => state.entities[state.selectedId]
);

export const getNbCategory = createSelector(
  getCategoryState,
  state => state.ids.map(id => state.entities[id]).length
);

