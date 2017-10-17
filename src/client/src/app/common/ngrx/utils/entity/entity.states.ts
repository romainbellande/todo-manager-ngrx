export interface EntityState<T> {
  ids: string[];
  entities: { [id: string]: T };
  selectedId: string | null;
}

export const initialState: EntityState<any> = {
  ids: [],
  entities: {},
  selectedId: null
};
