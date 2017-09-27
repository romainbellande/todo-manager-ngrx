import { ActionReducer } from '@ngrx/store';
import { Category } from '../../../../../../common/interfaces';
import * as CategoryActions from './category.actions';
import { CategoryState, initialState } from './category.states';


export function reducer(state = initialState, action: CategoryActions.All): CategoryState {
  switch (action.type) {
    case CategoryActions.ADD_CATEGORY: {
      return {
        ids: [...state.ids, action.payload._id],
        entities: Object.assign({}, state.entities, { [action.payload._id as string]: action.payload}),
        selectedCategoryId: action.payload._id
      };
    }

    case CategoryActions.LOAD_CATEGORIES_SUCCESS: {
      const categories = action.payload;
      const categoriesIds = categories.map(a => a._id);
      const newCategories: {[id: string]: Category} = {};
      categories.map(a => Object.assign(newCategories, {[a._id]: a}) );
      return {
        ids: categoriesIds,
        entities: newCategories,
        selectedCategoryId: state.selectedCategoryId
      };
    }

    case CategoryActions.SELECT_CATEGORY: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedCategoryId: action.payload
      };
    }

    case CategoryActions.SELECT_CATEGORY_BY_NAME: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedCategoryId: Object.values(state.entities)
          .find(entity => entity.name.toLowerCase() === action.payload)._id
      };
    }

    default: {
      return state;
    }
  }
}
