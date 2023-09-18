import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import Layout from '@/components/common/Layout';

const MyWaiting = dynamic(() => import('@/components/my_waiting/MyWaiting'), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense>
      <MyWaiting />
    </Suspense>
  );
}
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
