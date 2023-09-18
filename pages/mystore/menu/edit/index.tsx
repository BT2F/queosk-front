import EditMenuView from '@/components/views/edit_menu/EditMenuView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <EditMenuView />;
}
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
