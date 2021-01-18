import React from 'react';
import { Icon } from 'pcln-design-system';
import IndexPage from '../Pages/IndexPage';
import UsersPage from '../Pages/UsersPage';
import PostsPage from '../Pages/PostsPage';
import TagsPage from '../Pages/TagsPage';
import NewPostPage from '../Pages/NewPostPage';
import ConsolePage from '../Pages/ConsolePage';

export const defaultRoutes = [
  {
    url: '/',
    name: 'Home',
    exact: true,
    component: <IndexPage />,
    icon: <Icon name="Home" color="while" />,
  },
  // google52f5e5c6f60aa6d4.html
  {
    url: '/google52f5e5c6f60aa6d4.html',
    name: 'Verify',
    exact: true,
    component: <Redirect to="tonyb983.github.io/google52f5e5c6f60aa6d4.html" />,
    icon: <Icon name="Document" color="while" />,
  },
  {
    url: '/posts',
    name: 'Posts',
    exact: false,
    component: <PostsPage />,
    icon: <Icon name="Document" color="while" />,
  },
  {
    url: '/users',
    name: 'Users',
    exact: false,
    component: <UsersPage />,
    icon: <Icon name="User" color="while" />,
  },
  {
    url: '/tags',
    name: 'All Tags',
    exact: false,
    component: <TagsPage />,
    icon: <Icon name="Ribbon" color="while" />,
  },
  {
    url: '/newpost',
    name: 'New Post',
    exact: false,
    component: <NewPostPage />,
    icon: <Icon name="Plus" color="while" />,
  },
  {
    url: '/console',
    name: 'Console',
    exact: false,
    component: <ConsolePage />,
    icon: <Icon name="Devices" color="while" />,
  },
];
