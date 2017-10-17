import { Action } from '@ngrx/store';
import { EntityState } from './entity.states';
import { Entity } from '../../../../../../../common/interfaces';

export class Adapter<T> {
  constructor(private state: EntityState<T>, private payload: any) {}

  add() {
    return {
      ids: [...this.state.ids, this.payload._id],
      entities: Object.assign({}, this.state.entities, { [this.payload._id]: this.payload}),
      selectedId: this.payload._id
    };
  }

  loadSuccess() {
    const entitiesIds = this.payload.map(a => a._id);
    const newEntities: {[id: string]: T} = {};
    this.payload.map(a => Object.assign(newEntities, {[a._id]: a}) );
    return {
      ids: entitiesIds,
      entities: newEntities,
      selectedId: this.state.selectedId
    };
  }

  removeSuccess() {
    const removedEntity = this.payload;
    const newEntities = {};
    for (const id of Object.keys(this.state.entities)) {
      if (id !== removedEntity._id) {
        Object.assign(newEntities, { [id]: this.state.entities[id] });
      }
    }
    const selectedId = this.state.selectedId === removedEntity._id ? null : this.state.selectedId;
    return {
      ids: this.state.ids.filter(id => id !== removedEntity._id),
      entities: newEntities,
      selectedId: selectedId
    };
  }

  select() {
    return {
      ids: this.state.ids,
      entities: this.state.entities,
      selectedId: this.payload
    };
  }

  updateSuccess() {
    const entity: any = this.payload;
    return {
      ids: this.state.ids,
      entities: Object.assign({}, this.state.entities, { [entity._id]: entity }),
      selectedId: this.state.selectedId
    };
  }
}
