import { Theme } from '@radix-ui/themes';

const BaseRadixTheme = ({ ...props }) => (
  <Theme accentColor="amber" {...props} />
);

export default BaseRadixTheme;
