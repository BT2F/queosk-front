import { ReactElement } from 'react';

export default function RootLayout({ children }: { children: ReactElement }) {
  return <div className="max-w-[640px] mx-auto">{children}</div>;
}
