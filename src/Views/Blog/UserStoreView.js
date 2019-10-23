import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, OutlineButton } from 'pcln-design-system';
import UserView from './UserView';

const UserStoreView = ({ userDB }) => {
  const [showPasswords, setShowPasswords] = useState(false);

  if (!userDB) {
    return <div>There are no users to display.</div>;
  }

  return (
    <Container maxWidth={500}>
      <OutlineButton color="primary" m={2} p={2} onClick={() => setShowPasswords(!showPasswords)}>
        Show Passwords
      </OutlineButton>
      <ul className="UserStoreView">
        {userDB.allUsers.map((user) => (
          <UserView showPassword={showPasswords} key={user.login} user={user} />
        ))}
      </ul>
    </Container>
  );
};

export default observer(UserStoreView);
