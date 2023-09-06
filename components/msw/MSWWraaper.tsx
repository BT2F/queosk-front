import { ReactElement, useEffect, useState } from 'react';

const MSWMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
export default function MSWWraaper({ children }: { children: ReactElement }) {
  const [isMocking, setIsMocking] = useState(() => !MSWMode);

  useEffect(() => {
    const init = async () => {
      if (MSWMode) {
        const initMSW = await import('@/mocks/index').then(
          (res) => res.initMocks,
        );
        await initMSW();
        setIsMocking(true);
      }
    };

    !isMocking && init();
  }, [isMocking]);

  if (!isMocking) {
    return <div>msw 로딩중...</div>;
  }

  return <>{children}</>;
}
