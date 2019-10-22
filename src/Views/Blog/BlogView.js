import React from 'react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Blog } from '../../Models/Blog/BlogModel';
import PostView from './PostView';

const BlogView = ({ blog }) => {
  if (!blog) {
    return <div className="Error">There are no posts to display.</div>;
  }

  //console.log(`values(blog.posts): ${JSON.stringify(values(blog.posts), null, 2)}`);

  return (
    <div className="BlogView">
      {values(blog.posts).map((p) => (
        <PostView key={p.title} post={p} />
      ))}
    </div>
  );
};

export default observer(BlogView);
