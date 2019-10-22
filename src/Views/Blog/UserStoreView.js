import React from 'react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import UserView from './UserView';

const UserStoreView = ({ userDB }) => {
  if (!userDB || !userDB.length) {
    return <div>There are no users to display.</div>;
  }

  return (
    <ul className="UserStoreView">
      {values(userDB.users).map((user) => (
        <UserView key={user.login} user={user} />
      ))}
    </ul>
  );
};

export default observer(UserStoreView);
