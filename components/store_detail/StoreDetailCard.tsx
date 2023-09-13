import Image from 'next/image';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';
import Link from 'next/link';
import useStoreDetail from '@/hooks/useStoreDetail';

interface Props {
  storeId: string | number;
}
export default function StoreDetailCard({ storeId }: Props) {
  const { data } = useStoreDetail(storeId);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="relative max-h-[320px]">
        <Image
          src={data?.imageUrl || placeholderImgUrl('640x320')}
          alt="Movie"
          width={640}
          height={320}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title mb-2">{data?.restaurantName}</h2>
        <p>{data?.address}</p>
        <p>전화번호 : {data?.restaurantPhone}</p>
        <p>카테고리 : {data?.category}</p>
        <div className="card-actions justify-between items-center">
          <div className="flex justify-center gap-2">
            {data?.ratingAverage && (
              <>
                <span className="font-bold">별점 :</span>
                <div className="rating rating-md">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <input
                      key={`store_star_${i}`}
                      disabled
                      type="radio"
                      name="rating-7"
                      className="mask mask-star-2 bg-orange-400"
                      checked={i === parseInt(data.ratingAverage) - 1}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <Link href={`/store/${storeId}/wating`} className="">
            <button className="btn btn-md bg-yellow-400 hover:bg-yellow-300 duration-300">
              웨이팅 신청하러 가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const LoadingStoreDetailCard = () => (
  <div className="card bg-base-100 shadow-xl animate-pulse">
    <figure className="relative max-h-[320px]">
      <div className="w-[640px] h-[320px] bg-gray-400"></div>
    </figure>
    <div className="card-body">
      <div className="card-title mb-2 h-10 bg-gray-400"></div>
      <p className="h-5 bg-gray-400" />
      <p className="h-5 bg-gray-400" />
      <p className="h-5 bg-gray-400" />

      <div className="card-actions justify-between items-center">
        <div className="flex justify-center gap-2"></div>
        <div className="bg-gray-400 h-10 w-44 rounded mt-2"></div>
      </div>
    </div>
  </div>
);
