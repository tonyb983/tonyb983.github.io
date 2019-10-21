import {
  Store,
  createEmptyStore,
  createPreloadedStore,
  createStoreFromSnapshot,
  createRandomStore,
  CreateRandomPost,
  CreateRandomUser,
  CreateBlog,
  CreateUserStore
} from './StoreModel';
import { isString } from 'lodash';

describe('Store Model Tests', () => {
  it('Can create a new Store', () => {
    const store = Store.create({});

    expect(store).toBeDefined();
  });
});

describe('Create Random Functions', () => {
  it('Can create a random User', () => {
    const user = CreateRandomUser();
    expect(user).toBeDefined();
    expect(isString(user.login)).toBe(true);
    console.log(`Random User: ${JSON.stringify(user, null, 2)}`);
  });
});
