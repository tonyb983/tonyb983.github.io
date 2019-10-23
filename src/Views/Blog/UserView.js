import React from 'react';
import { observer } from 'mobx-react-lite';
import { repeat } from 'lodash';

const UserView = ({ user, showPassword }) => {
  if (!user) {
    return <div className="Error">Error displaying User.</div>;
  }

  const { login, password, loggedIn, settings } = user;

  return (
    <li className="UserView">
      <h4 className="UserViewLogin">{login}</h4>
      <h4 className="UserViewPassword">{showPassword ? password : repeat('*', password.length)}</h4>
      <h6 className="UserViewLoggedIn">{loggedIn ? 'Is Logged In' : 'Not Logged In'}</h6>
      <h6 className="UserViewSettings">{JSON.stringify(settings, null, 2)}</h6>
    </li>
  );
};

export default observer(UserView);
