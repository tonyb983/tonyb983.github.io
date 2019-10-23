import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';

import NavBar from './NavBar';
import IndexPage from '../Pages/IndexPage';
import UsersPage from '../Pages/UsersPage';
import PostsPage from '../Pages/PostsPage';
import TagsPage from '../Pages/TagsPage';
import NewPostPage from '../Pages/NewPostPage';

export const defaultRoutes = {
  home: { url: '/', name: 'Home', exact: true, component: <IndexPage /> },
  about: { url: '/posts', name: 'Posts', exact: false, component: <PostsPage /> },
  users: { url: '/users', name: 'Users', exact: false, component: <UsersPage /> },
  allTags: { url: '/tags', name: 'All Tags', exact: false, component: <TagsPage /> },
  newPost: { url: '/newpost', name: 'New Post', exact: false, component: <NewPostPage /> },
};

const Switchboard = ({ routes }) => {
  if (!routes) {
    routes = defaultRoutes;
  }

  return (
    <Router>
      <div>
        <NavBar routes={routes} />

        <Switch>
          {_.map(routes, (route) => (
            <Route path={route.url} exact={route.exact} key={route.name}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
};

export default Switchboard;
