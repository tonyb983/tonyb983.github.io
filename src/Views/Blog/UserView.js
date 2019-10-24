import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Heading, Icon, Stamp, Text } from 'pcln-design-system';
import { repeat } from 'lodash';

const UserView = ({ user, showPassword }) => {
  if (!user) {
    return <div className="Error">Error displaying User.</div>;
  }

  const { login, password, loggedIn, settings } = user;

  return (
    <Card
      data-testid="UserViewCard"
      boxShadowSize="xl"
      borderWidth={1}
      borderRadius={6}
      mb={4}
      p={4}
      bg="#FFF"
    >
      <Heading data-testid="UserViewLogin" pb={2}>
        {login}
      </Heading>
      <Heading data-testid="UserViewPassword" pb={2}>
        {showPassword ? password : repeat('*', password.length)}
      </Heading>
      {loggedIn ? (
        <Stamp data-testid="UserViewLoggedInStamp" pb={3} color="green">
          <Icon
            data-testid="UserViewLoggedInIcon"
            name="Check"
            title="Check Icon"
            titleId="unique-check-title-id"
            desc="Check Icon indicating user is logged in."
            descId="unique-check-desc-id"
          />{' '}
          User is logged in.
        </Stamp>
      ) : (
        <Stamp data-testid="UserViewLoggedInStamp" pb={3} color="red">
          <Icon
            data-testid="UserViewLoggedInIcon"
            name="Close"
            color="red"
            title="Close Icon"
            titleId="unique-close-title-id"
            desc="Close Icon indicating user is NOT logged in."
            descId="unique-close-desc-id"
          />{' '}
          User is not logged in.
        </Stamp>
      )}
      <Text pt={2} pb={2}>
        {JSON.stringify(settings, null, 2)}
      </Text>
    </Card>
  );
};

export default observer(UserView);
