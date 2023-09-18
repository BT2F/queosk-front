import { ReactElement } from 'react';

type IChildren = {
  children: ReactElement;
};

export default function Layout({ children }: IChildren) {
  return <main>{children}</main>;
}

Layout.Mobile = ({ children }: IChildren) => {
  return (
    <main className="max-w-[640px] min-h-screen mx-auto bg-white">
      {children}
    </main>
  );
};

Layout.Desktop = ({ children }: IChildren) => {
  return <main className="min-h-screen bg-white mx-auto">{children}</main>;
};
