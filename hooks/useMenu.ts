import { useQuery } from '@tanstack/react-query';
import { STORE_LIST_KEY } from '@/constants/store_list';
import axios from '@/lib/axios';

export default function useMenu(storeId: string | number) {
  return useQuery({
    queryKey: [STORE_LIST_KEY.MENU_LIST, storeId],
    queryFn: async () =>
      await axios
        .get(`/api/restaurants/${storeId}/menus`)
        .then((res) => res.data.menuList),
  });
}
