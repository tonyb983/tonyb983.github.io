// test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import GlobalProvider from '../Components/Providers/GlobalProviders';

const AllTheProviders = ({ children }) => {
  return <GlobalProvider>{children}</GlobalProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
