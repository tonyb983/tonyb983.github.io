import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import { defaultRoutes } from './defaultRoutes';
import ErrorBoundary from '../../Utils/ErrorBoundary';
import NavBar from './NavBar';
import MotionNav from './MotionNav/MotionNav';

const Switchboard = ({ routes }) => {
  if (!routes) {
    routes = defaultRoutes;
  }

  return (
    <Router>
      <div>
        <ErrorBoundary>
          <MotionNav routes={routes} />

          <Switch>
            {routes.map((route) => (
              <Route path={route.url} exact={route.exact} key={route.name}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default Switchboard;
