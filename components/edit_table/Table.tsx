interface TableProps {
  tableId: number;
  status: 'OPEN' | 'USING';
  mode: boolean;
  onTableClick: (tableId: number) => void;
  onStatusChange: (newStatus: 'OPEN' | 'USING') => void;
}

export default function Table({
  tableId,
  status,
  mode,
  onTableClick,
  onStatusChange,
}: TableProps) {
  const handleClick = () => {
    onTableClick(tableId);
  };

  return (
    <div className="card w-[180px] h-[200px] bg-base-100 shadow-xl border-2 border-[#FBBD23] rounded-3xl mt-7">
      <div className="pl-5 pr-3 py-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="card-title">{tableId}번</h2>
          {mode ? (
            <button className="btn btn-circle" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button className="btn btn-circl invisible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {status === 'OPEN' ? (
          <div className="font-bold text-sky-600">빈자리</div>
        ) : (
          <div className="font-bold text-rose-500">사용중..</div>
        )}
        {status === 'OPEN' ? (
          <button
            className="btn btn-outline btn-error"
            onClick={() => onStatusChange('USING')}
          >
            사용하기
          </button>
        ) : (
          <button
            className="btn btn-outline btn-info"
            onClick={() => onStatusChange('OPEN')}
          >
            비어놓기
          </button>
        )}
      </div>
    </div>
  );
}
