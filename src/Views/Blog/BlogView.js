import React from 'react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Blog } from '../../Models/Blog/BlogModel';
import PostView from './PostView';

const BlogView = ({ store }) => {
  if (!store) {
    return <div className="Error">There are no posts to display.</div>;
  }

  //console.log(`values(store.posts): ${JSON.stringify(values(store.posts), null, 2)}`);

  return (
    <div className="BlogView">
      {values(store.posts).map((p) => (
        <PostView key={p.title} post={p} />
      ))}
    </div>
  );
};

export default observer(BlogView);
