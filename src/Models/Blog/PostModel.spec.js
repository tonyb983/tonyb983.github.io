import { getSnapshot, isStateTreeNode, typecheck } from 'mobx-state-tree';
import { Post, PostStore } from './PostModel';

describe('Post Model Tests', () => {
  it('Can create a Post', () => {
    const postTitle = 'Post Title';
    const postContent = 'This is the content of the post.';
    const post = Post.create({ title: postTitle, content: postContent });

    debugger;
    expect(post).toBeDefined();
    expect(post.content).toBe(postContent);
    expect(post.title).toBe(postTitle);
    expect(post.created).toBeDate();
  });

  it('Fails when trying to create a post with no title or content.', () => {
    expect(() => Post.create()).toThrow();
    expect(() => Post.create({ title: 'Failure Post' })).toThrow();
    expect(() => Post.create({ content: 'Failed post content.' })).toThrow();
  });

  it('Can update the properties of a post.', () => {
    const postTitle = 'Post Title';
    const postContent = 'This is the content of the post.';
    const postTags = ['tag1', 'tag2'];
    const newTag = 'Tag3';
    const newTitle = 'New Post Title';
    const newContent = 'This is the new post content.';
    const additionalContent = ' This is more content.';
    const newTagFixed = 'tag3';
    const post = Post.create({ title: postTitle, content: postContent, tags: postTags });

    expect(post).toBeDefined();
    expect(post.content).toBe(postContent);
    expect(post.title).toBe(postTitle);
    expect(post.tags).toContainValues(postTags);
    expect(post.tags.length).toBe(2);
    expect(post.hasTag('tag1')).toBe(true);

    post.updateTitle(newTitle);
    expect(post.title).toBe('New Post Title');

    post.updateContent(newContent);
    expect(post.content).toBe('This is the new post content.');

    post.addTag(newTag);
    expect(post.tags).not.toContainValue('Tag3');
    expect(post.tags).toContainValue('tag3');
    expect(post.tags.length).toBe(3);

    post.removeTag('tag2');
    expect(post.tags.length).toBe(2);
    expect(post.hasTag('tag2')).toBe(false);

    post.removeTag('tag1');
    expect(post.tags.length).toBe(1);

    post.removeTag('tag3');
    expect(post.tags.length).toBe(0);

    post.addTag(['tag1', 'tag2']);
    expect(post.tags.length).toBe(2);

    post.appendContent(additionalContent);
    expect(post.content).toBe(newContent + additionalContent);

    post.appendContent(undefined);
    expect(post.content).toBe(newContent + additionalContent);

    post.appendContent(null);
    expect(post.content).toBe(newContent + additionalContent);

    post.appendContent(11111);
    expect(post.content).toBe(newContent + additionalContent);
  });

  it('Will not update post properties with invalid data.', () => {
    const postTitle = 'Post Title';
    const postContent = 'This is the content of the post.';
    const post = Post.create({ title: postTitle, content: postContent });

    post.updateTitle(111);
    expect(post.title).toBe(postTitle);
    post.updateTitle(undefined);
    expect(post.title).toBe(postTitle);

    post.updateContent({ fail: true });
    expect(post.content).toBe(postContent);
    post.updateContent(null);
    expect(post.content).toBe(postContent);

    post.addTag('tag1');
    expect(post.tags.length).toBe(1);

    post.addTag(111);
    expect(post.tags.length).toBe(1);

    post.addTag(undefined);
    expect(post.tags.length).toBe(1);

    post.addTag(null);
    expect(post.tags.length).toBe(1);

    post.removeTag(111);
    expect(post.tags.length).toBe(1);

    post.removeTag('tag999');
    expect(post.tags.length).toBe(1);

    post.addTag([null, undefined, 'tag', 1111, { fail: true }]);
    expect(post.tags.length).toBe(2);

    expect(post.hasTag(111)).toBe(false);
    expect(post.hasTag(undefined)).toBe(false);
  });
});

describe('Post Store Tests', () => {
  it('Can create a post store.', () => {
    const store = PostStore.create();

    expect(store).toBeDefined();
  });

  it('Can add and remove Posts to a Post Store.', () => {
    const store = PostStore.create();
    const post1 = Post.create({ title: 'Post Title 1', content: 'Post content number 1.' });
    const post2 = Post.create({ title: 'Post Title 2', content: 'Post content number two.' });
    const p1ID = post1.id;

    expect(store.posts.size).toBe(0);

    store.addPost(post1);

    expect(store.posts.size).toBe(1);

    store.addPost(post2);

    expect(store.posts.size).toBe(2);

    expect(store.postCount).toBe(2);

    expect(store.removePost(p1ID)).toBe(true);
    expect(store.postCount).toBe(1);
  });

  it('Can retreive posts from the store.', () => {
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
    const store = PostStore.create();

    store.addPost(post1);
    store.addPost(post2);
    store.addPost(post3);

    expect(store.posts.size).toBe(3);
    expect(store.allTags.length).toBe(5);

    const stringSearch = store.searchPostsByString('3');
    expect(stringSearch).toBeDefined();

    const titleSearch = store.searchPostsByTitle('3');
    expect(titleSearch[0].title).toBe('Post Title 3');

    const contentSearch = store.searchPostsByContent('two');
    expect(contentSearch[0].content).toBe('Post content number two.');

    const tagExactSearch = store.searchPostsByTag('tag1');
    expect(tagExactSearch.length).toBe(2);

    const tagTextSearch = store.searchPostsByTagText('tag');
    expect(tagTextSearch.length).toBe(3);
  });

  it('Fails gracefully when given invalid data.', () => {
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
    const store = PostStore.create();
    store.setDebugMode(true);
    store.setDebugMode(null);
    store.setDebugMode(undefined);
    expect(store.debugMode).toBe(true);
    store.setDebugMode(false);
    expect(store.debugMode).toBe(false);
    store.addPost(post1);
    store.addPost(post2);
    store.addPost(post3);
    expect(store.posts.size).toBe(3);

    store.addPost(undefined);
    expect(store.posts.size).toBe(3);

    const fakePost = { fail: true, something: 'this is a string' };
    store.addPost(fakePost);
    expect(store.posts.size).toBe(3);

    store.addPost({ content: 'Post content four.', title: 'Post Title 4' });
    expect(store.posts.size).toBe(4);

    store.removePost({ fake: true });
    expect(store.posts.size).toBe(4);

    store.removePost(undefined);
    expect(store.posts.size).toBe(4);

    store.removePost(null);
    expect(store.posts.size).toBe(4);
  });
});
