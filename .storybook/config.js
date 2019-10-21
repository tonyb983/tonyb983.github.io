import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from './theme';

addDecorator((storyFn) => <div style={{ textAlign: 'center' }}>{storyFn()}</div>);
addDecorator(withThemes);
addDecorator(withKnobs);

addParameters({
  themes: [
    { name: 'twitter', class: 'theme-twt', color: '#00aced', default: true },
    { name: 'facebook', class: 'theme-fb', color: '#3b5998' },
  ],
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

configure(require.context('../src', true, /\.stories\.js$/), module);
