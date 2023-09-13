import useLocation from '@/hooks/useLocation';
import StoreListNav from '@/components/store_list/StoreListNav';
import StoreList, { LoadingStoreList } from '@/components/store_list/StoreList';
import { Suspense } from 'react';
import StoreHeader from '@/components/store_list/StoreHeader';
import StoreLocationError from '@/components/store_list/StoreLocationError';
import Nav from '@/components/common/Nav';

export default function StoreListView() {
  const { location } = useLocation();

  return (
    <div className="relative flex flex-col p-5 min-h-screen">
      <StoreHeader location={location} />
      <StoreListNav />
      {location.onLoad ? (
        location.coords ? (
          <Suspense fallback={<LoadingStoreList />}>
            <StoreList location={location} />
          </Suspense>
        ) : (
          <StoreLocationError />
        )
      ) : (
        <LoadingStoreList />
      )}

      <Nav />
    </div>
  );
}
