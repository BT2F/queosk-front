import { NextPageContext } from 'next';
import StoreMenuView from '@/components/views/store_detail/StoreMenuView';
import { Suspense } from 'react';

interface Props {
  storeId: string;
  tableId: string;
}
export default function Index(props: Props) {
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
