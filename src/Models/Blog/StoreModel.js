import { types, getEnv } from 'mobx-state-tree';
import { random, times, isNumber, isArray, isMatch, isEmpty, isNil, has } from 'lodash';
import faker from 'faker';
import { Post } from './PostModel';
import { Blog } from './BlogModel';
import { User, UserStore, UserSettings } from './UserModel';

export const Store = types
  .model({
    blog: types.optional(Blog, () => ({ posts: {}, debugMode: false })),
    users: types.optional(UserStore, () => ({ users: {}, debugMode: false })),
  })
  .views((self) => ({
    get env() {
      return getEnv(self);
    },
    get allPosts() {
      return self.blog.allPosts;
    },
  }))
  .actions((self) => ({}));

export const createFreshStore = () => {
  return Store.create({});
};

export const createPreloadedStore = () => {
  const user1 = User.create({
    login: 'user@test.com',
    password: 'badpassword',
    settings: UserSettings.create({ emailNotifications: true }),
  });
  const user2 = User.create({
    login: 'tony@theshit.com',
    password: 'badpassword',
    settings: UserSettings.create({ theme: 'Dark', emailNotifications: true }),
  });
  const user3 = User.create({ login: 'alex@alrighty.com', password: 'badpassword' });

  const users = UserStore.create();
  users.registerUser(user1);
  users.registerUser(user2);
  users.registerUser(user3);

  const post1 = Post.create({
    title: 'Post Title 1',
    content: 'Post content number one.',
    tags: ['tag1', 'tag4'],
  });
  const post2 = Post.create({
    title: 'Post Title 2',
    content: 'Post content number two.',
    tags: ['tag2', 'tag5'],
  });
  const post3 = Post.create({
    title: 'Post Title 3',
    content: 'Post content number three.',
    tags: ['tag6', 'tag4', 'tag1'],
  });

  const blog = Blog.create();
  blog.addPost(post1);
  blog.addPost(post2);
  blog.addPost(post3);

  const store = Store.create({ blog, users });
  return store;
};

export const createStoreFromSnapshot = (snapShot) => {
  if (!snapShot) return createFreshStore();

  return Store.create(snapShot);
};

export const createRandomStore = () => {
  
  const users = CreateUserStore(times(random(5, 10), (_) => CreateRandomUser()));
  const blog = CreateBlog(times(random(10,40), (_) => CreateRandomPost()))

  return Store.create({blog, users});
};

export const CreateRandomUser = () => {
  const u = faker.helpers.userCard();
  const p = faker.random.alphaNumeric(random(8, 14));
  const settings = UserSettings.create();
  if (random(3) > 1) {
    settings.set('theme', 'Dark');
  }
  if (random(3) > 1) {
    settings.set('emailNotifications', 'true');
  }
  return User.create({ login: u.email, password: p, settings });
};

export const CreateUserStore = (options = undefined) => {
  const store = UserStore.create();

  if(!options || isNil(options)) return store;

  if(isNumber(options) && options > 0){
    times(count, (_) => CreateRandomUser()).forEach(u => store.registerUser(u));
    return store;
  }

  if(has(options,['min', 'max']) &&
      isNumber(options.min) &&
      isNumber(options.max) &&
      options.min >= 0 &&
      options.max >= options.min){
    times(random(options.min, options.max), (_) => CreateRandomUser()).forEach(u => store.registerUser(u));
    return store;
  }

  if(isArray(options) && options.length > 0 && options.every(i => !isNil(i))){
    users.forEach(u => store.registerUser(u));
    return store;
  }

  return store;
}

export const CreateRandomPost = () => {
  const title = faker.hacker.phrase;
  const content = times(random(1, 6), (_) => faker.company.catchPhrase).join('. ');
  const tags = times(random(6), (_) => faker.commerce.department);
  return Post.create({ title, content, tags });
};

export const CreateBlog = (options = undefined) => {
  const store = Blog.create();

  if(!options || isNil(options)) return store;

  if(isNumber(options) && options > 0){
    times(count, (_) => CreateRandomPost()).forEach(p => store.addPost(p));
    return store;
  }

  if(has(options,['min', 'max']) &&
      isNumber(options.min) &&
      isNumber(options.max) &&
      options.min >= 0 &&
      options.max >= options.min){
    times(random(options.min, options.max), (_) => CreateRandomPost()).forEach(p => store.addPost(p));
    return store;
  }

  if(isArray(options) && options.length > 0 && options.every(i => !isNil(i))){
    users.forEach(p => store.addPost(p));
    return store;
  }

  return store;
}


