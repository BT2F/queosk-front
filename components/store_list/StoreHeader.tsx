import { IGeolocation } from '@/hooks/useLocation';

interface Props {
  location: IGeolocation;
}
export default function StoreHeader({ location }: Props) {
  return (
    <div className="flex items-center gap-2">
      <b>위치 상태</b> :
      {!location.onLoad ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : !location.error ? (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      ) : (
        <span>위치 권한을 허용해주세요!</span>
      )}
    </div>
  );
}
