import {
  Store,
  createEmptyStore,
  createPreloadedStore,
  createStoreFromSnapshot,
  createRandomStore,
  CreateRandomPost,
  CreateRandomUser,
  CreateBlog,
  CreateUserStore,
} from './StoreModel';
import { isString, times } from 'lodash';
import * as emailValidator from 'node-email-validation';
import emailValidator2 from 'is-valid-email';

describe('Store Model Tests', () => {
  it('Can create a new Store', () => {
    const store = Store.create({});

    expect(store).toBeDefined();
  });
});

describe('Create Random Functions', () => {
  describe('Create Random User', () => {
    it('Can create a random User', () => {
      const user = CreateRandomUser();
      expect(user).toBeDefined();
      expect(isString(user.login)).toBe(true);
      expect(isString(user.password)).toBe(true);
      expect(emailValidator.is_email_valid(user.login)).toBe(true);
      expect(emailValidator2(user.login)).toBe(true);
      console.log(`Random User: ${JSON.stringify(user, null, 2)}`);
    });

    it('Logs user creation', () => {
      const originalConsole = console.log;
      console.log = jest.fn();
      const user = CreateRandomUser(true);
      expect(user).toBeDefined();
      expect(console.log.mock.calls.length).toBe(1);
      console.log = originalConsole;
    });

    it('Works 100 times', () => {
      expect(() => times(100, (_) => CreateRandomUser())).not.toThrow();
    });
  });

  describe('Create Random Post', () => {
    it('Can create a random Post', () => {
      const post = CreateRandomPost();
      expect(post).toBeDefined();
      expect(isString(post.title)).toBe(true);
      expect(isString(post.content)).toBe(true);
      expect(post.tags).toBeDefined();
      expect(post.tags.length).toBeGreaterThanOrEqual(0);
      expect(post.tags.length).toBeLessThanOrEqual(6);
    });

    it('Logs post creation', () => {
      const originalConsole = console.log;
      console.log = jest.fn();
      const post = CreateRandomPost(true);
      expect(post).toBeDefined();
      expect(console.log.mock.calls.length).toBe(1);
      console.log = originalConsole;
    });

    it('Works 100 times', () => {
      expect(() => times(100, (_) => CreateRandomPost())).not.toThrow();
    });
  });
});
