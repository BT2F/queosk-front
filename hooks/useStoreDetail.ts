import { useQuery } from '@tanstack/react-query';
import { IStoreRes } from '@/types/store.type';
import { STORE_LIST_KEY } from '@/constants/store_list';
import axios from '@/lib/axios';

export default function useStoreDetail(storeId: string | number) {
  return useQuery<IStoreRes>({
    queryKey: [STORE_LIST_KEY.STORE, storeId],
    queryFn: async () =>
      await axios
        .get(`/api/restaurants/${storeId}/details`)
        .then((res) => res.data.restaurantDto),
  });
}
