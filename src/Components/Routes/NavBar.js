import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Layout/Home';
import About from '../Layout/About';
import Users from '../Layout/Users';

import style from './Navigation.module.css';

const NavBar = ({ routes }) => {
  if (!routes) {
    const error = `${style.Navigation} Error`;
    return <div className={error}>Invalid Routes Given</div>;
  }

  return (
    <div>
      <ul className={style.Navigation}>
        {routes.map((r) => (
          <Link to={r.url}>{r.name}</Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
