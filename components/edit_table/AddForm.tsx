import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface Props {
  refresh: () => void;
}

interface FormData {
  tableName: string;
}

export default function AddForm({ refresh }: Props) {
  const [tableName, setTableName] = useState<FormData>();

  const addNewTable = async () => {
    try {
      await axios.post('/api/restaurant/table', tableName);
      refresh();
      reset();
    } catch (error) {
      console.error('테이블 추가', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setTableName({ tableName: data.tableName });

    if (isSubmitSuccessful) {
      reset();
    }
  };

  useEffect(() => {
    if (tableName) {
      addNewTable();
    }
  }, [tableName]);

  return (
    <div className="h-full flex flex-col justify-center gap-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[330px] mx-auto gap-2">
          <label className="label w-full" htmlFor="menuName">
            <span className="label-text font-bold">테이블명</span>
          </label>
          <input
            {...register('tableName', {
              required: true,
            })}
            id="menuName"
            type="text"
            placeholder="테이블명"
            className="input input-bordered w-full max-w-xs"
          />
          <button
            className=" flex btn w-[330px] border-2 rounded-2xl bg-base-200 mx-auto"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
}
