import { Post } from './PostModel';

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
