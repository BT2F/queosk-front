import StoreDetailCard, {
  LoadingStoreDetailCard,
} from '@/components/store_detail/StoreDetailCard';
import StoreDetailReviewEditor from '@/components/store_detail/StoreDetailReviewEditor';
import { Suspense } from 'react';

interface Props {
  storeId: string;
}
export default function StoreDetailView({ storeId }: Props) {
  return (
    <div className="p-2">
      <Suspense fallback={<LoadingStoreDetailCard />}>
        <StoreDetailCard storeId={storeId} />
        <span className="divider" />
        <StoreDetailReviewEditor />
      </Suspense>
    </div>
  );
}
