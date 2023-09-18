import { NextPageContext } from 'next';
import StoreMenuView from '@/components/views/store_detail/StoreMenuView';
import { ReactElement, Suspense } from 'react';
import Layout from '@/components/common/Layout';

interface Props {
  storeId: string;
  tableId: string;
}
export default function Page(props: Props) {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <StoreMenuView {...props} />
    </Suspense>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { storeId, tableId } = context.query;
  return {
    props: {
      storeId,
      tableId,
    },
  };
};

Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
