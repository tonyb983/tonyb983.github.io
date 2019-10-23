import React from 'react';
import { ThemeProvider, theme } from 'pcln-design-system';
//import theme from '@rebass/preset';

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
