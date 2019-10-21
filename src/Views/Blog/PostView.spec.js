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
import PostView from './PostView';

describe('Post View Tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders without a Post', async () => {
    const queries = render(<PostView />);
    expect(queries.container.children.item(0).className).toBe('Error');
  });

  it('Renders a static Post', () => {
    const post = Post.create({
      title: 'Post Title',
      content: "This is the post content. It's longer that it needs to be.",
      tags: ['tag1', 'tag2'],
    });
    const queries = render(<PostView post={post} />);

    expect(queries.container.children.item(0).className).toBe('PostView');
    // console.log(prettyDOM(queries.container));
  });

  it('Updates the Post View when the Post is changed.', () => {
    const post = Post.create({
      title: 'Post Title',
      content: "This is the post content. It's longer that it needs to be.",
      tags: ['tag1', 'tag2'],
    });
    const queries = render(<PostView post={post} />);

    expect(queries.container.children.item(0).className).toBe('PostView');
    //console.log(prettyDOM(queries.container));
    const titleH2 = head(queries.container.getElementsByClassName('PostTitle'));
    const dateSpan = head(queries.container.getElementsByClassName('PostDate'));
    const contentDiv = head(queries.container.getElementsByClassName('PostContent'));
    const tagsDiv = head(queries.container.getElementsByClassName('PostTags'));

    expect(titleH2.textContent).toBe('Post Title');
    expect(dateSpan).toBeDefined();
    expect(contentDiv.textContent).toBe(
      "This is the post content. It's longer that it needs to be.",
    );
    expect(tagsDiv.textContent).toBe(['tag1', 'tag2'].join(' '));

    //console.log(prettyDOM(titleH2));
    act(() => {
      post.updateTitle('This is a New Title');
    });
    //console.log(prettyDOM(titleH2));
    expect(titleH2.textContent).toBe('This is a New Title');

    act(() => {
      post.appendContent('\nLets add some new content!');
    });
    expect(contentDiv.textContent).toInclude('new');
    //console.log(prettyDOM(queries.container));
  });
});
