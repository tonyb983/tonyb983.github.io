import { types, getEnv } from 'mobx-state-tree';
import { random, times, isNumber, isArray, isNil, has } from 'lodash';
import faker from 'faker';
import { Post } from './PostModel';
import { Blog } from './BlogModel';
import { User, UserStore, UserSettings } from './UserModel';

export const Store = types
  .model({
    blog: types.optional(Blog, () => ({ posts: {}, debugMode: false })),
    userDB: types.optional(UserStore, () => ({ users: {}, debugMode: false })),
  })
  .views((self) => ({
    get env() {
      return getEnv(self);
    },
    get allPosts() {
      return self.blog.allPosts;
    },
    get allUsers() {
      return self.users.allUsers;
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
  const post4 = Post.create({
    title: 'Post Title 4',
    content: 'Post content number four.',
    tags: ['tag1', 'tag2', 'tag7'],
  });
  const post5 = Post.create({
    title: 'Post Title 5',
    content: 'Post content number five.',
    tags: ['tag3', 'tag4', 'tag5'],
  });
  const post6 = Post.create({
    title: 'Post Title 6',
    content: 'Post content number six.',
    tags: [],
  });

  const blog = Blog.create();
  blog.addPost(post1);
  blog.addPost(post2);
  blog.addPost(post3);
  blog.addPost(post4);
  blog.addPost(post5);
  blog.addPost(post6);

  const store = Store.create({ blog, users });
  return store;
};

export const createStoreFromSnapshot = (snapShot) => {
  if (!snapShot) return createFreshStore();

  return Store.create(snapShot);
};

export const createRandomStore = (logCreation = false) => {
  const userDB = CreateUserStore(8, logCreation, logCreation);
  const blog = CreateBlog(30, logCreation, logCreation);

  if (logCreation) {
    console.log(`Creating store with ${userDB.users.size} Users and ${blog.posts.size} Posts.`);
  }

  const store = Store.create({ blog, userDB });
  //console.log(`Created Random Store: ${JSON.stringify(store, null, 2)}`);
  return store;
};

export const CreateRandomUser = (logs = false) => {
  const login = faker.internet.email();
  const password = faker.internet.password(random(8, 16), true);
  const settings = UserSettings.create();

  if (random(3) > 1) {
    settings.set('theme', 'Dark');
  }
  if (random(3) > 1) {
    settings.set('emailNotifications', 'true');
  }

  if (logs) {
    console.log(
      `CreateRandomUser: Creating random user - { login: '${login}', password: '${password}', settings: ${JSON.stringify(
        settings,
      )} }`,
    );
  }

  return User.create({ login, password, settings });
};

export const CreateUserStore = (options = undefined, logs = false, logUsers = false) => {
  const store = UserStore.create();

  if (isNil(options)) {
    if (logs) {
      console.log(
        'CreateUserStore: undefined or null options value passed in, returning empty UserStore',
      );
    }
    return store;
  }

  if (isNumber(options) && options > 0) {
    if (logs) {
      console.log(`CreateUserStore: number passed in, returning UserStore with ${options} users.`);
    }
    times(options, (_) => CreateRandomUser(logUsers)).forEach((u) => store.registerUser(u));

    return store;
  }

  if (
    has(options, 'min') &&
    has(options, 'max') &&
    isNumber(options.min) &&
    isNumber(options.max) &&
    options.min >= 0 &&
    options.max >= options.min
  ) {
    if (logs) {
      console.log(
        `CreateUserStore: object with min and max passed in, returning UserStore with ${options.min}-${options.max} users.`,
      );
    }
    times(random(options.min, options.max), (_) => CreateRandomUser(logUsers)).forEach((u) =>
      store.registerUser(u),
    );

    return store;
  }

  if (isArray(options) && options.length > 0 && options.every((i) => !isNil(i))) {
    if (logs) {
      console.log(
        `CreateUserStore: array passed in, returning UserStore with ${options.length} users.`,
      );
    }
    options.forEach((u) => store.registerUser(u));
    return store;
  }

  return store;
};

export const CreateRandomPost = (logs = false) => {
  const title = faker.company.catchPhrase();
  const content = times(random(1, 5), (_) => faker.hacker.phrase()).join(' ');
  const tags = times(random(6), (_) => faker.commerce.department());

  if (logs) {
    console.log(
      `CreateRandomPost: Creating random post - {title: '${title}', content: '${content}', tags: [${tags.join(
        ',',
      )}]}`,
    );
  }

  return Post.create({ title, content, tags });
};

export const CreateBlog = (options = undefined, logs = false, logPosts = false) => {
  const store = Blog.create();

  if (isNil(options)) return store;

  if (isNumber(options) && options > 0) {
    if (logs) {
      console.log(`CreateBlog: number passed in, returning Blog with ${options} posts.`);
    }
    times(options, (_) => CreateRandomPost(logPosts)).forEach((p) => store.addPost(p));
    return store;
  }

  if (
    has(options, 'min') &&
    has(options, 'max') &&
    isNumber(options.min) &&
    isNumber(options.max) &&
    options.min >= 0 &&
    options.max >= options.min
  ) {
    if (logs) {
      console.log(
        `CreateBlog: object with min and max passed in, returning Blog with ${options.min}-${options.max} posts.`,
      );
    }
    times(random(options.min, options.max), (_) => CreateRandomPost(logPosts)).forEach((p) =>
      store.addPost(p),
    );
    return store;
  }

  if (isArray(options) && options.length > 0 && options.every((i) => !isNil(i))) {
    if (logs) {
      console.log(`CreateBlog: array passed in, returning Blog with ${options.length} posts.`);
    }
    options.forEach((p) => store.addPost(p));
    return store;
  }

  return store;
};
