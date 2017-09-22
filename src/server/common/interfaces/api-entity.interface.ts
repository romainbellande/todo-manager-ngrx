export interface ApiEntity {
  create(): void;
  find(): void;
  findById(): void;
  delete(): void;
  update(): void;
  replace(): void;
}
