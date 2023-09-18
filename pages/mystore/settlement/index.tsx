import SettlementView from '@/components/views/settlement/SettlementView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <SettlementView />;
}
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
