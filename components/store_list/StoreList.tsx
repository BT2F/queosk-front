import { useInfiniteQuery } from '@tanstack/react-query';
import { STORE_LIST_KEY } from '@/constants/store_list';
import axios from '@/lib/axios';
import { IGeolocation } from '@/hooks/useLocation';
import useSearchParams from '@/hooks/useSearchParams';
import { Fragment } from 'react';
import { IStoreRes } from '@/types/store.type';
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

    getNextPageParam: (lastPage) => {
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
        loader={
          <div className="flex justify-center" key={0}>
            <span className="loading loading-dots loading-lg" />
          </div>
        }
      >
        {data?.pages.length &&
          data.pages.map((pageGroup, i) => (
            <Fragment key={`page_group_${i}`}>
              {pageGroup.content.length ? (
                pageGroup.content.map((v: IStoreRes, j: number) => (
                  <StoreCard {...v} key={`store-list-key-${v.id}`} />
                ))
              ) : (
                <div className="flex justify-center items-center mt-5 font-xl">
                  해당하는 매장이 없습니다!
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
      <LoadingStoreCard key={`fragment-loading-${i}`} />
    ))}
  </div>
);
