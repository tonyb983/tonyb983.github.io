import {
  Store,
  createFreshStore,
  createPreloadedStore,
  createStoreFromSnapshot,
} from './StoreModel';

describe('Store Model Tests', () => {
  it('Can create a new Store', () => {
    const store = Store.create({});

    expect(store).toBeDefined();
  });
});
