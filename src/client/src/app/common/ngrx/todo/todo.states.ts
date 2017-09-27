import { Todo } from '../../../../../../common/interfaces';

export interface TodoState {
  ids: string[];
  entities: { [id: string]: Todo };
  selectedTodoId: string | null;
}

export const initialState: TodoState = {
  ids: [],
  entities: {},
  selectedTodoId: null
};
