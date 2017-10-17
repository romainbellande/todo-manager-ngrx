import { ActionReducer } from '@ngrx/store';
import { Todo } from '../../../../../../common/interfaces';
import * as TodoActions from './todo.actions';
import { EntityState, initialState, Adapter } from '../utils/entity';

export function reducer(state = initialState, action: TodoActions.All): EntityState<Todo> {
  const adapter = new Adapter<Todo>(state, action.payload);

  switch (action.type) {
    case TodoActions.$.ADD: {
      return adapter.add();
    }

    case TodoActions.$.LOAD_SUCCESS: {
      return adapter.loadSuccess();
    }

    case TodoActions.$.REMOVE_SUCCESS: {
      return adapter.removeSuccess();
    }

    case TodoActions.$.SELECT: {
      return adapter.select();
    }

    case TodoActions.$.UPDATE_SUCCESS: {
      return adapter.updateSuccess();
    }

    default: {
      return state;
    }
  }
}
