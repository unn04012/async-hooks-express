import { AsyncLocalStorage } from 'async_hooks';
import { EntityManager } from 'typeorm';

export type RequestAsyncaLocalContext = {
  requestId: string;
};

export const requestAlsInstance = new AsyncLocalStorage<RequestAsyncaLocalContext>();
export const transactionAlsInstance = new AsyncLocalStorage<EntityManager>();
