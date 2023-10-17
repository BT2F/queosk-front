import Table from '@/components/edit_table/Table';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Nav from '@/components/common/mystore/Nav';
import TableAdd from '@/components/edit_table/TableAdd';

export interface TablesData {
  tableId: number;
  status: 'OPEN' | 'USING';
  tableName: string;
}

export default function TableView() {
  const [editMode, setEditMode] = useState(false);
  const [tables, setTables] = useState<TablesData[]>([]);
  const [deleteTableId, setDeleteTableId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('');

  const getTables = async () => {
    try {
      const response = await axios.get('/api/restaurant/tables');
      const data = response.data;
      setTables(data);
    } catch (error) {
      console.error('매장 테이블 현황', error);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getTables();
  //   }, 10000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const deleteTable = async (tableId: number) => {
    try {
      await axios.delete(`/api/restaurant/table/${tableId}`);
      getTables();
      setDeleteTableId(null);
    } catch (error) {
      console.error('DELETE 요청 오류:', error);
    }
  };

  const newStatusTable = async (tableId: number, tableStatus: string) => {
    try {
      await axios.put(
        `/api/restaurant/table/${tableId}?tableStatus=${tableStatus}`
      );
      getTables();
    } catch (error) {
      console.error('put 요청 오류:', error);
    }
  };

  const handleTableClick = (tableId: number) => {
    setDeleteTableId(tableId);
  };

  const handleStatusChange = (tableId: number, newStatus: 'OPEN' | 'USING') => {
    setNewStatus(newStatus);
    newStatusTable(tableId, newStatus);
  };

  useEffect(() => {
    if (deleteTableId) {
      deleteTable(deleteTableId);
      getTables();
    }
  }, [deleteTableId]);

  return (
    <div className="flex">
      <Nav />
      <div className="w-full">
        <div className="flex items-center justify-end w-full h-[100px] px-6 bg-gray-100">
          <div className="w-full flex gap-5 justify-end">
            {editMode && <TableAdd refresh={getTables} />}
            <div
              className="btn w-[120px] bg-gray-300"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '돌아가기' : '테이블 편집'}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap">
          {tables.length > 0 ? (
            tables.map((table, index) => (
              <div key={index} className="w-1/4 px-5">
                <Table
                  tableId={table.tableId}
                  status={table.status}
                  tableName={table.tableName}
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
    </div>
  );
}
