import React from 'react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Banner } from 'pcln-design-system';
import PostView from './PostView';

const BlogView = ({ blog }) => {
  if (!blog) {
    return (
      <Banner
        data-testid="BlogViewError"
        p={2}
        color="error"
        iconName="Warning"
        text="There are no posts to display."
      />
    );
  }

  //console.log(`values(blog.posts): ${JSON.stringify(values(blog.posts), null, 2)}`);

  return (
    <div data-testid="BlogView" className="BlogView">
      {blog.allPostsNewestFirst().map((p) => (
        <PostView key={p.title} post={p} />
      ))}
    </div>
  );
};

export default observer(BlogView);
