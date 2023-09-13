import StoreDetailCard, {
  LoadingStoreDetailCard,
} from '@/components/store_detail/StoreDetailCard';
import StoreDetailReviewEditor from '@/components/store_detail/StoreDetailReviewEditor';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import BackButton from '@/components/common/BackButton';

interface Props {
  storeId: string;
}
export default function StoreDetailView({ storeId }: Props) {
  const router = useRouter();

  return (
    <div className="p-2">
      <div className="pb-2">
        <BackButton href={'/store'} />
      </div>
      <Suspense fallback={<LoadingStoreDetailCard />}>
        <StoreDetailCard storeId={storeId} />
        <span className="divider" />
        <StoreDetailReviewEditor />
      </Suspense>
    </div>
  );
}
