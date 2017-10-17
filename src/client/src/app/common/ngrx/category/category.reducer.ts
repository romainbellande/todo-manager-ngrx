import { ActionReducer } from '@ngrx/store';
import { Category } from '../../../../../../common/interfaces';
import { $, All } from './category.actions';
import { EntityState, initialState, Adapter } from '../utils/entity';

export function reducer(state = initialState, action: All): EntityState<Category> {
  const adapter = new Adapter<Category>(state, action.payload);

  switch (action.type) {
    case $.ADD: {
      return adapter.add();
    }

    case $.LOAD_SUCCESS: {
      return adapter.loadSuccess();
    }

    case $.SELECT: {
      return adapter.select();
    }

    case $.SELECT_BY_NAME: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedId: Object.values(state.entities)
          .find(entity => entity.name.toLowerCase() === action.payload)._id
      };
    }

    default: {
      return state;
    }
  }
}
