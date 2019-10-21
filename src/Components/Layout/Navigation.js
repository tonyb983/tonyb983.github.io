import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Users from './Users';

import style from './Navigation.module.css';

const Routes = {
  home: { url: '/', name: 'Home', component: <Home /> },
  about: { url: '/about', name: 'About', component: <About /> },
  users: { url: '/users', name: 'Users', component: <Users /> },
};

const Navigation = (props) => {
  return (
    <Router>
      <div>
        <nav>
          <ul className={style.Navigation}>
            <li>
              <Link to={Routes.home.url}>{Routes.home.name}</Link>
            </li>
            <li>
              <Link to={Routes.about.url}>{Routes.about.name}</Link>
            </li>
            <li>
              <Link to={Routes.users.url}>{Routes.users.name}</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path={Routes.about.url}>{Routes.about.component}</Route>
          <Route path={Routes.users.url}>{Routes.users.component}</Route>
          <Route path={Routes.home.url}>{Routes.home.component}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Navigation;
