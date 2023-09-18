import Layout from '@/components/common/Layout';
import { ReactElement, Suspense } from 'react';
import dynamic from 'next/dynamic';

const NumOfVisitor = dynamic(
  () => import('@/components/views/waiting/NumsOfVisitor'),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <Suspense>
      <NumOfVisitor />
    </Suspense>
  );
}

Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;

