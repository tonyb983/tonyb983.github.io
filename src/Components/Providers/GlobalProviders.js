import React from 'react';
import { StoreProvider } from './StoreProvider';
import ThemeProvider from './ThemeProvider';

export default ({ children }) => (
  <StoreProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </StoreProvider>
);
