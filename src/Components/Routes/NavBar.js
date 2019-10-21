import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import style from './NavBar.module.css';

const NavBar = ({ routes }) => {
  if (!routes) {
    const error = `${style.Navigation} Error`;
    return <div className={error}>Invalid Routes Given</div>;
  }

  return (
    <div>
      <ul className={style.Navigation}>
        {_.map(routes, (route, key) => (
          <Link key={key} to={route.url}>
            {route.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
