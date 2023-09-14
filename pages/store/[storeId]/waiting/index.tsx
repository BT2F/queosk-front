import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const Waiting = dynamic(() => import('@/components/views/waiting/Waiting'),
  {
    ssr: false,
  }
);
export default function Page() {
  return (
    <Suspense>
      <Waiting />
    </Suspense>
  );
}

