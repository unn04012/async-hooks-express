export interface IContextStorageProvider<T> {
  save(key: T): void;
  get(): T | undefined;
}
