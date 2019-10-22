import React from 'react';
import UserStoreView from '../../Views/Blog/UserStoreView';
import { useStore } from '../Providers/StoreProvider';

const UsersPage = (props) => {
  const { userDB } = useStore();

  return (
    <div className="UsersPage">
      <UserStoreView userDB={userDB} />
    </div>
  );
};

export default UsersPage;
