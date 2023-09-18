import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import Layout from '@/components/common/Layout';

const Waiting = dynamic(() => import('@/components/views/waiting/Waiting'), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense>
      <Waiting />
    </Suspense>
  );
}

Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
