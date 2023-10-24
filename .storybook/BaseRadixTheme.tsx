import { Theme } from '@radix-ui/themes';

const BaseRadixTheme = ({ ...props }) => (
  <Theme accentColor="amber" radius={'large'} {...props} />
);

export default BaseRadixTheme;
