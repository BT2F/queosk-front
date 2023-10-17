import { TablesData } from '../views/edit_table/TableView';

interface TableProps extends TablesData {
  mode: boolean;
  onTableClick: (tableId: number) => void;
  onStatusChange: (newStatus: 'OPEN' | 'USING') => void;
}

export default function Table({
  tableId,
  tableName,
  status,
  mode,
  onTableClick,
  onStatusChange,
}: TableProps) {
  const handleClick = () => {
    onTableClick(tableId);
  };

  return (
    <div
      className={`card items-center w-full h-[200px] shadow-xl border-2 rounded-3xl mt-7 ${
        status === 'OPEN' ? 'border-orange-300' : 'border-base-300'
      }`}
    >
      <div className="w-full px-4 py-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="card-title text-gray-500">{tableName}</h2>
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {status === 'OPEN' ? (
          <button
            className="btn w-2/5 bg-orange-200 mx-auto"
            onClick={() => onStatusChange('USING')}
          >
            사용하기
          </button>
        ) : (
          <button
            className="btn w-2/5 bg-base-300 mx-auto"
            onClick={() => onStatusChange('OPEN')}
          >
            비어놓기
          </button>
        )}
      </div>
    </div>
  );
}
