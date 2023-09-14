import StoreDetailView from '@/components/views/store_detail/StoreDetailView';
import { NextPageContext } from 'next';

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
