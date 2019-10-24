import React from 'react';
import IndexPage from '../Pages/IndexPage';
import UsersPage from '../Pages/UsersPage';
import PostsPage from '../Pages/PostsPage';
import TagsPage from '../Pages/TagsPage';
import NewPostPage from '../Pages/NewPostPage';
import ConsolePage from '../Pages/ConsolePage';

export const defaultRoutes = [
  { url: '/', name: 'Home', exact: true, component: <IndexPage /> },
  { url: '/posts', name: 'Posts', exact: false, component: <PostsPage /> },
  { url: '/users', name: 'Users', exact: false, component: <UsersPage /> },
  { url: '/tags', name: 'All Tags', exact: false, component: <TagsPage /> },
  { url: '/newpost', name: 'New Post', exact: false, component: <NewPostPage /> },
  { url: '/console', name: 'Console', exact: false, component: <ConsolePage /> },
];
