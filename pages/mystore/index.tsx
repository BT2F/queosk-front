import MystorePageView from '@/components/views/mystore_page/MystorePageView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <MystorePageView />;
}
Page.getLayout = (page: ReactElement) => (
  <Layout.Desktop>{page}</Layout.Desktop>
);
