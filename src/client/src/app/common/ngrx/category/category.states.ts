import { Category } from '../../../../../../common/interfaces';

export interface CategoryState {
  ids: string[];
  entities: { [id: string]: Category };
  selectedCategoryId: string | null;
}

export const initialState: CategoryState = {
  ids: [],
  entities: {},
  selectedCategoryId: null
};
