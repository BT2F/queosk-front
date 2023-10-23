import { Theme } from '@radix-ui/themes';

const BaseRadixTheme = ({ ...props }) => (
  <Theme accentColor="amber" radius={'full'} {...props} />
);

export default BaseRadixTheme;
