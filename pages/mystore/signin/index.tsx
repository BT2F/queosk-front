import OwnerSignInView from '@/components/views/auth/OwnerSignInView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <OwnerSignInView />;
}
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
