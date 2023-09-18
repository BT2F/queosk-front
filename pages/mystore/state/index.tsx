import OrderListMoveView from '@/components/views/order_move/OrderListMoveView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <OrderListMoveView />;
}
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
