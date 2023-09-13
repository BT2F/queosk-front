import StoreMenuHeader from '@/components/store_detail/StoreMenuHeader';

import dynamic from 'next/dynamic';
import StoreMenuNav from '@/components/store_detail/StoreMenuNav';

interface Props {
  storeId: string;
  tableId: string;
}

const StoreMenuList = dynamic(
  () => import('@/components/store_detail/StoreMenuList'),
  {
    ssr: false,
  },
);

export default function StoreMenuView(props: Props) {
  return (
    <div className="relative min-h-screen mb-16 ">
      <StoreMenuHeader {...props} />
      <StoreMenuList {...props} />
      <StoreMenuNav />
    </div>
  );
}
