import { types, getEnv } from 'mobx-state-tree';
import { random } from 'lodash';
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

export const createRandomStore = () => {};

const CreateUser = () => {
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

const CreatePost = () => {
  const title = faker.hacker.phrase;
  let content = '';
  const _ = new Array(random(1, 6)).forEach((_) => (content += faker.company.catchPhrase() + ' '));
  const tags = new Array(random(6));
  tags.forEach((t, i) => (tags[i] = faker.commerce.department));
  return Post.create({ title, content, tags });
};

export const createStoreFromSnapshot = (snapShot) => {
  if (!snapShot) return createFreshStore();

  return Store.create(snapShot);
};
