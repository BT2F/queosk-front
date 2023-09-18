import Account from '@/components/views/account/Account';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <Account />;
}
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
