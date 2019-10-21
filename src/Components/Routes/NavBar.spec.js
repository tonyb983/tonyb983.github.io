import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  queryHelpers,
  waitForDomChange,
  prettyDOM,
  cleanup,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { head } from 'lodash';
import NavBar from './NavBar';

const Home = (props) => <div>Home Page</div>;
const About = (props) => <div>About Page</div>;
const Users = (props) => <div>Users Page</div>;

const routeData = {
  home: { url: '/', name: 'Home', exact: true, component: <Home /> },
  about: { url: '/about', name: 'About', exact: false, component: <About /> },
  users: { url: '/users', name: 'Users', exact: false, component: <Users /> },
};

describe('NavBar Component Tests', () => {
  it('Renders without crashing.', () => {
    const utils = render(
      <MemoryRouter>
        <NavBar routes={routeData} />
      </MemoryRouter>,
    );
  });
});
