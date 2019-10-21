import React from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

const PostView = ({ post }) => {
  if (!post) {
    return <div className="Error">Something has gone wrong...</div>;
  }

  const {
    title = 'Unable to get post title.',
    content = 'Unable to get post content.',
    tags = [],
    created = new Date(1),
  } = post;

  return (
    <div className="PostView">
      <h2 className="PostTitle">{title}</h2>
      <span className="PostDate">{format(created, 'Pp')}</span>
      <div className="PostContent">{content}</div>
      <div className="PostTags">{tags && tags.length > 0 && tags.join(' ')}</div>
    </div>
  );
};

export default observer(PostView);
