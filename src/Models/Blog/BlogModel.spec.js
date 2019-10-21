import { Blog } from './BlogModel';
import { Post } from './PostModel';

describe('Blog Tests', () => {
  it('Can create a Blog.', () => {
    const store = Blog.create();

    expect(store).toBeDefined();
  });

  it('Can add and remove Posts to a Blog.', () => {
    const store = Blog.create();
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
    const store = Blog.create();
    const id1 = post1.id;

    store.addPost(post1);
    store.addPost(post2);
    store.addPost(post3);

    expect(store.posts.size).toBe(3);
    expect(store.allTags.length).toBe(5);

    const stringSearch = store.searchPostsByString('3');
    expect(stringSearch[0].title).toBe('Post Title 3');

    const titleSearch = store.searchPostsByTitle('3');
    expect(titleSearch[0].title).toBe('Post Title 3');

    const contentSearch = store.searchPostsByContent('two');
    expect(contentSearch[0].content).toBe('Post content number two.');

    const tagExactSearch = store.searchPostsByTag('tag1');
    expect(tagExactSearch.length).toBe(2);

    const tagTextSearch = store.searchPostsByTagText('tag');
    expect(tagTextSearch.length).toBe(3);

    const stringFirst = store.firstPostByString('3');
    expect(stringFirst.title).toBe('Post Title 3');

    const titleFirst = store.firstPostByTitle('3');
    expect(titleFirst.title).toBe('Post Title 3');

    const contentFirst = store.firstPostByContent('two');
    expect(contentFirst.content).toBe('Post content number two.');

    const tagExactFirst = store.firstPostByTag('tag1');
    expect(tagExactFirst.title).toBe('Post Title 1');

    const tagTextFirst = store.firstPostByTagText('tag');
    expect(tagTextFirst.title).toBe('Post Title 1');

    const idSearch = store.getPostByID(id1);
    expect(idSearch).toBeDefined();
    expect(idSearch.content).toBe('Post content number one.');

    //console.log(`BlogModel: ${JSON.stringify(store, null, 2)}`);
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
    const store = Blog.create();
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

  it('Search functions fail gracefully when given invalid data.', () => {
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
    const store = Blog.create();
    store.addPost(post1);
    store.addPost(post2);
    store.addPost(post3);

    const empty = [];

    const findByContent1 = store.searchPostsByContent(undefined);
    expect(findByContent1).toStrictEqual(empty);
    const findByContent2 = store.searchPostsByContent(111);
    expect(findByContent2).toStrictEqual(empty);

    const firstByContent1 = store.firstPostByContent(undefined);
    expect(firstByContent1).not.toBeDefined();
    const firstByContent2 = store.firstPostByContent(111);
    expect(firstByContent2).not.toBeDefined();

    const findByTitle1 = store.searchPostsByTitle(undefined);
    expect(findByTitle1).toStrictEqual(empty);
    const findByTitle2 = store.searchPostsByTitle(111);
    expect(findByTitle2).toStrictEqual(empty);

    const firstByTitle1 = store.firstPostByTitle(undefined);
    expect(firstByTitle1).not.toBeDefined();
    const firstByTitle2 = store.firstPostByTitle(111);
    expect(firstByTitle2).not.toBeDefined();

    const findByTag1 = store.searchPostsByTag(undefined);
    expect(findByTag1).toStrictEqual(empty);
    const findByTag2 = store.searchPostsByTag(111);
    expect(findByTag2).toStrictEqual(empty);

    const firstByTag1 = store.firstPostByTag(undefined);
    expect(firstByTag1).not.toBeDefined();
    const firstByTag2 = store.firstPostByTag(111);
    expect(firstByTag2).not.toBeDefined();

    const findByTagText1 = store.searchPostsByTagText(undefined);
    expect(findByTagText1).toStrictEqual(empty);
    const findByTagText2 = store.searchPostsByTagText(undefined);
    expect(findByTagText2).toStrictEqual(empty);

    const firstByTagText1 = store.firstPostByTagText(undefined);
    expect(firstByTagText1).not.toBeDefined();
    const firstByTagText2 = store.firstPostByTagText(undefined);
    expect(firstByTagText2).not.toBeDefined();

    const findByString1 = store.searchPostsByString(undefined);
    expect(findByString1).toStrictEqual(empty);
    const findByString2 = store.searchPostsByString(undefined);
    expect(findByString2).toStrictEqual(empty);

    const firstByString1 = store.firstPostByString(undefined);
    expect(firstByString1).not.toBeDefined();
    const firstByString2 = store.firstPostByString(undefined);
    expect(firstByString2).not.toBeDefined();
  });
});
