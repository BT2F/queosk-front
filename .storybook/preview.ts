import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import '@radix-ui/themes/styles.css';
import BaseRadixTheme from './BaseRadixTheme';
import { Theme } from '@radix-ui/themes';
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    Provider: BaseRadixTheme,
  }),
];

export default preview;
