import Image from 'next/image';
import { IStoreRes } from '@/types/storeList.type';
import Link from 'next/link';

export default function StoreCard(props: IStoreRes) {
  return (
    <Link
      href={`/store/${props.id}`}
      className="card card-side bg-base-100 shadow-xl [&+&]:mt-4"
    >
      <figure className="!min-w-[100px]">
        <Image
          src={props.imageUrl}
          alt="Movie"
          width={100}
          height={100}
          objectFit="cover"
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
