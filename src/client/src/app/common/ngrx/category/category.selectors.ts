import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.states';

export const getCategoryState = createFeatureSelector<CategoryState>('category');

export const getCategoryEntitiesState = createSelector(
  getCategoryState,
  state => state.ids.map(id => state.entities[id]));

export const getSelected = createSelector(
  getCategoryState,
  state => state.entities[state.selectedCategoryId]
);

export const getNbCategory = createSelector(
  getCategoryState,
  state => state.ids.map(id => state.entities[id]).length
);

