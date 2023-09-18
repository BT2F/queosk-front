import StoreDetailView from '@/components/views/store_detail/StoreDetailView';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

interface Props {
  storeId: string;
}
export default function Page({ storeId }: Props) {
  return <StoreDetailView storeId={storeId} />;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { storeId } = context.query;
  return { props: { storeId } };
};

Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
