import Table from '@/components/edit_table/Table';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface TablesData {
  tableId: number;
  status: 'OPEN';
}

export default function TableView() {
  const [editMode, setEditMode] = useState(false);
  const [tables, setTables] = useState<TablesData[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('');

  //매장 테이블 현황
  const getTables = async () => {
    try {
      const response = await axios.get('/api/restaurant/tables');
      const data = response.data;
      console.log(data);
      setTables(data);
    } catch (error) {
      console.error('매장 테이블 현황', error);
    }
  };
  useEffect(() => {
    getTables();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      getTables();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //테이블 추가
  const AddTable = async () => {
    try {
      const response = await axios.post('/api/restaurant/table');
      console.log(response?.data);
      getTables();
    } catch (error) {
      console.error('추가 요청 오류:', error);
    }
  };

  //테이블 삭제
  const deleteTable = async (tableId: number) => {
    try {
      const response = await axios.delete(`/api/restaurant/table/${tableId}`);
      getTables();
      setSelectedTableId(null);
    } catch (error) {
      console.error('DELETE 요청 오류:', error);
    }
  };

  //테이블 상태 수정
  const newStatusTable = async (tableId: number, tableStatus: string) => {
    try {
      const response = await axios.put(
        `/api/restaurant/table/${tableId}?tableStatus=${tableStatus}`
      );
      getTables();
    } catch (error) {
      console.error('put 요청 오류:', error);
    }
  };

  const handleTableClick = (tableId: number) => {
    setSelectedTableId(tableId);
  };
  const handleStatusChange = (tableId: number, newStatus: 'OPEN' | 'USING') => {
    setNewStatus(newStatus);
    newStatusTable(tableId, newStatus);
  };
  useEffect(() => {
    if (selectedTableId) {
      console.log(selectedTableId);
      deleteTable(selectedTableId);
      getTables();
    }
  }, [selectedTableId]);

  return (
    <div>
      <div className="flex items-center justify-end w-full h-[100px] px-6 bg-gray-100">
        <div className="flex gap-5 ">
          {editMode && (
            <button onClick={AddTable} className="btn w-[120px] bg-blue-300">
              테이블 추가
            </button>
          )}
          <div
            className="btn w-[120px] bg-gray-300"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? '돌아가기' : '테이블 편집'}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start mx-5 gap-7">
        {tables.length > 0 ? (
          tables.map((table, index) => (
            <div key={index}>
              <Table
                tableId={table.tableId}
                status={table.status}
                mode={editMode}
                onTableClick={handleTableClick}
                onStatusChange={(newStatus) =>
                  handleStatusChange(table.tableId, newStatus)
                }
              />
            </div>
          ))
        ) : (
          <p>테이블 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
