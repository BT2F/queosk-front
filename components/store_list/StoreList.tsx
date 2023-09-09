import { useInfiniteQuery } from '@tanstack/react-query';
import { STORE_LIST_KEY } from '@/constants/store_list';
import axios from '@/lib/axios';
import { IGeolocation } from '@/hooks/useLocation';
import useSearchParams from '@/hooks/useSearchParams';
import { Fragment } from 'react';
import { IStoreRes } from '@/types/storeList.type';
import StoreCard, { LoadingStoreCard } from '@/components/store_list/StoreCard';
import InfiniteScroll from 'react-infinite-scroller';

interface Props {
  location: IGeolocation;
}
export default function StoreList({ location }: Props) {
  const searchParams = useSearchParams();
  const fetchFn = async ({ pageParam = 0 }) => {
    let query = '?';

    query += searchParams.toString();

    if (location.onLoad && location.coords) {
      const { longitude: x, latitude: y } = location.coords;
      query += `&x=${x}&y=${y}`;
    }

    return await axios
      .get(`/api/restaurants/coord${query}&size=5&page=${pageParam}`)
      .then((res) => res.data);
  };
  const {
    data,
    fetchNextPage,

    isError,
  } = useInfiniteQuery({
    queryKey: [STORE_LIST_KEY.STORE_LIST],
    queryFn: fetchFn,

    getNextPageParam: (lastPage, pages) => {
      return +lastPage.pageable.pageNumber + 1;
    },
  });

  if (isError) return <div>오류 발생</div>;

  const isNextPage = () =>
    data?.pages.at(-1).pageable.pageNumber + 1 < data?.pages.at(-1).totalPages;

  return (
    <div className="mt-5">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={isNextPage()}
        loader={<LoadingStoreList />}
      >
        {data?.pages.length &&
          data.pages.map((pageGroup, i) => (
            <Fragment key={`page_group_${i}`}>
              {pageGroup.content?.map((v: IStoreRes) => (
                <StoreCard {...v} key={`store-list-key-${v.restaurantName}`} />
              )) || (
                <div className="font-xl flex justify-center items-center mt-5">
                  해당하는 가게가 존재하지 않습니다!
                </div>
              )}
            </Fragment>
          ))}
      </InfiniteScroll>
    </div>
  );
}

export const LoadingStoreList = () => (
  <div className="mt-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <LoadingStoreCard key={i} />
    ))}
  </div>
);
