import BackButton from '@/components/common/BackButton';

interface Props {
  tableId: string;
}
export default function StoreMenuHeader({ tableId }: Props) {
  return (
    <div className="flex justify-between">
      <div className="p-2">
        <BackButton />
      </div>
      <div className="flex flex-col w-32 h-32 border items-center p-2 bg-red-500/95 rounded-bl-xl text-white">
        <p>테이블 번호</p>
        <h3 className="text-6xl font-bold mt-2">{tableId}</h3>
      </div>
    </div>
  );
}
