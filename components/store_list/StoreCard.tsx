import Image from 'next/image';
import { IStoreRes } from '@/types/store.type';
import Link from 'next/link';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';

export default function StoreCard(props: IStoreRes) {
  return (
    <Link
      href={`/store/${props.id}`}
      className="card card-side bg-base-100 shadow-xl [&+&]:mt-4 h-[128px]"
    >
      <figure className="relative !w-[128px]">
        <Image
          src={props.imageUrl || placeholderImgUrl('128x128')}
          className="w-[128px]"
          fill={true}
          alt="Movie"
        />
      </figure>
      <div className="card-body !p-5">
        <h2 className="card-title">{props.restaurantName}</h2>
        <p>{props.address}</p>
      </div>
    </Link>
  );
}

export const LoadingStoreCard = () => (
  <div className="card card-side bg-base-100 shadow-xl [&+&]:mt-4 animate-pulse">
    <figure className="!min-w-[100px]">
      <div className="w-[128px] h-[128px] bg-gray-500" />
    </figure>
    <div className="card-body !p-5">
      <div className="card-title h-7 w-24 mb-2 bg-gray-400" />
      <div className="h-4 w-full bg-gray-400" />
      <div className="h-4 w-44 bg-gray-400" />
    </div>
  </div>
);
