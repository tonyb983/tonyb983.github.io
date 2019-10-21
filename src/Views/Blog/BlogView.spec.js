import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  queryHelpers,
  waitForDomChange,
  prettyDOM,
  cleanup,
} from '@testing-library/react';
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
    const queries = render(<BlogView />);
    expect(queries.container.children.item(0).className).toBe('Error');
  });

  it('Renders when the store has no posts.', async () => {
    const store = Blog.create({});

    const queries = render(<BlogView store={store} />);
    expect(queries.container.children.item(0).className).toBe('BlogView');
  });

  it('Renders a list of posts.', () => {
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

    const queries = render(<BlogView store={store} />);
    const blogView = head(queries.container.getElementsByClassName('BlogView'));
    const postViews = queries.container.getElementsByClassName('PostView');

    expect(blogView).toBeDefined();
    //console.log(prettyDOM(queries.container));
    expect(postViews.length).toBe(3);

    act(() => {
      store.addPost({ title: 'Post 4', content: 'The fourth post son!' });
    });
    const newPostViews = queries.container.getElementsByClassName('PostView');
    expect(newPostViews.length).toBe(4);
  });
});
