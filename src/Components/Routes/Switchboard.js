import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import faker from 'faker';

import NavBar from './NavBar';
import Home from '../_Placeholder/Home';
import About from '../_Placeholder/About';
import Users from '../_Placeholder/Users';

export const defaultRoutes = {
  home: { url: '/', name: 'Home', exact: true, component: <Home /> },
  about: { url: '/about', name: 'About', exact: false, component: <About /> },
  users: { url: '/users', name: 'Users', exact: false, component: <Users /> },
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
