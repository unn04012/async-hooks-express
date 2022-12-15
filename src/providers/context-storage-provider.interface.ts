//TODO delete provider module
export interface IContextStorageProvider<T> {
  save(key: T): void;
  get(): T | undefined;
}
