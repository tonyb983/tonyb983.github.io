import React from 'react';
import BlogView from '../../Views/Blog/BlogView';
import { useStore } from '../Providers/StoreProvider';
import ScrollToTop from '../../Utils/ScrollToTop';

const PostsPage = (props) => {
  const { blog } = useStore();

  return (
    <div className="PostsPage">
      <ScrollToTop />
      <BlogView blog={blog} />
    </div>
  );
};

export default PostsPage;
