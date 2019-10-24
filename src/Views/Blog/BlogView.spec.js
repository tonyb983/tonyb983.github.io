import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  queryHelpers,
  waitForDomChange,
  prettyDOM,
  cleanup,
} from '../../Utils/TestUtils';
import { act } from 'react-dom/test-utils';
import { head } from 'lodash';
import { Post } from '../../Models/Blog/PostModel';
import { Blog } from '../../Models/Blog/BlogModel';
import PostView from './PostView';
import BlogView from './BlogView';

describe('Blog View Tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders without a store', async () => {
    const { findByText } = render(<BlogView />);
    const blogView = await findByText('There are no posts to display.');
    expect(blogView).toBeDefined();
  });

  it('Renders when the store has no posts.', async () => {
    const blog = Blog.create({});

    const { findByTestId } = render(<BlogView />);
    const blogView = await findByTestId('BlogViewError');
    expect(blogView).toBeDefined();
  });

  it('Renders a list of posts.', async () => {
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

    const { findByTestId, findAllByTestId } = render(<BlogView blog={blog} />);
    const blogView = await findByTestId('BlogView');
    const postViews = await findAllByTestId('PostView');

    expect(blogView).toBeDefined();
    //console.log(prettyDOM(queries.container));
    expect(postViews.length).toBe(3);

    act(() => {
      blog.addPost({ title: 'Post 4', content: 'The fourth post son!' });
    });
    const newPostViews = await findAllByTestId('PostView');
    expect(newPostViews.length).toBe(4);
  });
});
