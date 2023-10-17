import TableView from '@/components/views/edit_table/TableView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <TableView />;
}
Page.getLayout = (page: ReactElement) => (
  <Layout.Desktop>{page}</Layout.Desktop>
);
