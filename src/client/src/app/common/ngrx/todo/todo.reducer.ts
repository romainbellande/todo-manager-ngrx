import { ActionReducer } from '@ngrx/store';
import { Todo } from '../../../../../../common/interfaces';
import * as TodoActions from './todo.actions';
import { TodoState, initialState } from './todo.states';

export function reducer(state = initialState, action: TodoActions.All): TodoState {
  switch (action.type) {
    case TodoActions.ADD_TODO: {
      return {
        ids: [...state.ids, action.payload._id],
        entities: Object.assign({}, state.entities, { [action.payload._id as string]: action.payload}),
        selectedTodoId: action.payload._id
      };
    }

    case TodoActions.LOAD_TODOS_SUCCESS: {
      const todos = action.payload;
      const todosIds = todos.map(a => a._id);
      const newTodos: {[id: string]: Todo} = {};
      todos.map(a => Object.assign(newTodos, {[a._id]: a}) );
      return {
        ids: todosIds,
        entities: newTodos,
        selectedTodoId: state.selectedTodoId
      };
    }

    case TodoActions.REMOVE_TODO_SUCCESS: {
      const removedTodo = action.payload;
      const newEntities = {};
      for (const id of Object.keys(state.entities)) {
        if (id !== removedTodo._id) {
          Object.assign(newEntities, { [id]: state.entities[id] });
        }
      }
      const selectedTodoId = state.selectedTodoId === removedTodo._id ? null : state.selectedTodoId;
      return {
        ids: state.ids.filter(id => id !== removedTodo._id),
        entities: newEntities,
        selectedTodoId: selectedTodoId
      };
    }

    case TodoActions.SELECT_TODO: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedTodoId: action.payload
      };
    }

    case TodoActions.UPDATE_TODO_SUCCESS: {
      const todo: Todo = action.payload;
      console.log('updated todo', todo);
      console.log('res', Object.assign({}, { [todo._id]: todo }, state.entities));
      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [todo._id]: todo }),
        selectedTodoId: state.selectedTodoId
      };
    }

    default: {
      return state;
    }
  }
}
