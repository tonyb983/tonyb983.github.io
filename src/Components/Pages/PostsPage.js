import React from 'react';
import BlogView from '../../Views/Blog/BlogView';
import { useStore } from '../Providers/StoreProvider';

const PostsPage = (props) => {
  const { blog } = useStore();

  return (
    <div className="PostsPage">
      <BlogView blog={blog} />
    </div>
  );
};

export default PostsPage;
