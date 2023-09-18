import StoreListView from '@/components/views/store_list/StoreListView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';
import Nav from '@/components/common/Nav';

export default function Page() {
  return <StoreListView />;
}

Page.getLayout = (page: ReactElement) => (
  <>
    <Layout.Mobile>{page}</Layout.Mobile>
    <Nav />
  </>
);
