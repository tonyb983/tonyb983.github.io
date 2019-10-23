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
import PostView from './PostView';

describe('Post View Tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders without a Post', async () => {
    const { findByTestId } = render(<PostView />);
    const post = await findByTestId('PostViewError');
    expect(post.innerHTML.includes('Error displaying post.')).toBe(true);
  });

  it('Renders a static Post', async () => {
    const post = Post.create({
      title: 'Post Title',
      content: "This is the post content. It's longer that it needs to be.",
      tags: ['tag1', 'tag2'],
    });
    const { findByTestId } = render(<PostView post={post} />);
    const postHtml = await findByTestId('PostView');

    expect(postHtml.firstChild.textContent.includes('/')).toBe(true);
    // console.log(prettyDOM(queries.container));
  });

  it('Updates the Post View when the Post is changed.', async () => {
    const post = Post.create({
      title: 'Post Title',
      content: "This is the post content. It's longer that it needs to be.",
      tags: ['tag1', 'tag2'],
    });
    const { findByTestId } = render(<PostView post={post} />);
    const postView = await findByTestId('PostView');
    const postViewDate = await findByTestId('PostViewDate');
    const postViewTitle = await findByTestId('PostViewTitle');
    const postViewContent = await findByTestId('PostViewContent');
    const postViewTag1 = await findByTestId('PostViewTag0');
    const postViewTag2 = await findByTestId('PostViewTag1');

    expect(postViewTitle.textContent).toBe('Post Title');
    //console.log(prettyDOM(queries.container));

    expect(postViewDate).toBeDefined();
    expect(postViewContent.textContent).toBe(
      "This is the post content. It's longer that it needs to be.",
    );
    expect(postViewTag1.textContent).toBe('tag1');

    //console.log(prettyDOM(titleH2));
    act(() => {
      post.updateTitle('This is a New Title');
    });
    //console.log(prettyDOM(titleH2));
    expect(postViewTitle.textContent).toBe('This is a New Title');

    act(() => {
      post.appendContent('\nLets add some new content!');
    });
    expect(postViewContent.textContent).toInclude('new');
    //console.log(prettyDOM(queries.container));
  });
});
