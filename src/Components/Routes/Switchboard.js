import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../_Placeholder/Home';
import About from '../_Placeholder/About';
import Users from '../_Placeholder/Users';

const Routes = {
  home: { url: '/', name: 'Home', component: <Home /> },
  about: { url: '/about', name: 'About', component: <About /> },
  users: { url: '/users', name: 'Users', component: <Users /> },
};

const Switchboard = ({ routes }) => {
  if (!routes) {
    routes = Routes;
  }
  return (
    <Router>
      <div>
        <NavBar routes={routes} />

        <Switch>
          {routes.map((r) => (
            <Route path={r.url}>{r.component}</Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
};

export default Switchboard;
