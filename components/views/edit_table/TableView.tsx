import Table from '@/components/edit_table/Table';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import { table } from 'console';

interface TablesData {
  tableId: number;
  status: 'OPEN';
}

export default function TableView() {
  const [editMode, setEditMode] = useState(false);
  const [tables, setTables] = useState<TablesData[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('');

  // const requestData = {
  //   ownerId: 'darm',
  //   password: '1234',
  // };

  // axios
  //   .post('/api/restaurants/signin', requestData)
  //   .then((response) => {
  //     console.log('응답 데이터:', response.data);
  //   })
  //   .catch((error) => {
  //     console.error('에러:', error);
  //   });

  //매장 테이블 현황
  const getTables = async () => {
    try {
      const response = await axios.get('/api/restaurant/tables', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiZW1haWwiOiJhc2RAZGFybS5rciIsInVzZXJSb2xlIjoiUk9MRV9SRVNUQVVSQU5UIiwiaXNzIjoicXVlb3NrIiwiaWF0IjoxNjk0NDUyNTU1LCJleHAiOjE2OTQ1Mzg5NTV9.pbGzwlMzAgFV_UlyrIOywkc-DkK47jbJZ2474OuNO9c`,
        },
      });
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

  //테이블 조회
  // const getTablesIdCheck = async () => {
  //   try {
  //     const tableId = 6;
  //     const response = await axios.get(`/api/restaurant/table/${tableId}`, {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiZW1haWwiOiJhc2RAZGFybS5rciIsInVzZXJSb2xlIjoiUk9MRV9SRVNUQVVSQU5UIiwiaXNzIjoicXVlb3NrIiwiaWF0IjoxNjk0NDUyMjUwLCJleHAiOjE2OTQ1Mzg2NTB9.9JJnek5arRAMI_sRC_PA7fJc0-BNN4Vrlf1oi22BToQ`,
  //       },
  //     });
  //     const data = response.data;
  //     console.log(data);
  //     setTableIdStatus(data);
  //   } catch (error) {
  //     console.error('테이블 조회', error);
  //   }
  // };
  // getTablesIdCheck();

  //테이블 추가
  const AddTable = async () => {
    try {
      const response = await axios.post('/api/restaurant/table', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiZW1haWwiOiJhc2RAZGFybS5rciIsInVzZXJSb2xlIjoiUk9MRV9SRVNUQVVSQU5UIiwiaXNzIjoicXVlb3NrIiwiaWF0IjoxNjk0NDUyMzY1LCJleHAiOjE2OTQ1Mzg3NjV9.QflB4lraeeTC92TlNZEmm-6YykGljLw8F-akijYEpD0`,
        },
      });
      console.log(response?.data);
      getTables();
    } catch (error) {
      console.error('추가 요청 오류:', error);
    }
  };

  //테이블 삭제
  const deleteTable = async (tableId: number) => {
    try {
      const response = await axios.delete(`/api/restaurant/table/${tableId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiZW1haWwiOiJhc2RAZGFybS5rciIsInVzZXJSb2xlIjoiUk9MRV9SRVNUQVVSQU5UIiwiaXNzIjoicXVlb3NrIiwiaWF0IjoxNjk0NDQ3NzYxLCJleHAiOjE2OTQ1MzQxNjF9.TbWoQQwCLnqIdHVvocpQdzt571xE7V8IhR36WS3Evz0`,
        },
      });
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
        `/api/restaurant/table/${tableId}?tableStatus=${tableStatus}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiZW1haWwiOiJhc2RAZGFybS5rciIsInVzZXJSb2xlIjoiUk9MRV9SRVNUQVVSQU5UIiwiaXNzIjoicXVlb3NrIiwiaWF0IjoxNjk0NDQ3NzYxLCJleHAiOjE2OTQ1MzQxNjF9.TbWoQQwCLnqIdHVvocpQdzt571xE7V8IhR36WS3Evz0`,
          },
        }
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
