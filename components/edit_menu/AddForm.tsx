import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

interface FormData {
  menuImg: File;
  menuName: string;
  menuPrice: string;
}

interface AddFormProps {
  menuData: (data: FormData) => void;
}
export default function AddForm({ menuData }: AddFormProps) {
  const [fileImage, setFileImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newData = { fileImage, ...data };

    menuData(newData);
  };

  const saveFileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center ">
        <div className="font-bold text-xl my-4">메뉴 등록</div>
        <button
          className="w-[80px] h-[33px] border-2 border-blue-300 rounded-md"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          추가
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            {...register('menuName', {
              required: true,
            })}
            type="text"
            placeholder="메뉴명"
            className="border pl-2"
          />
          <input
            {...register('menuPrice', {
              required: true,
            })}
            type="text"
            placeholder="가격"
            className="border pl-2"
          />
        </div>
        <div className="flex justify-between">
          <input
            {...register('menuImg', {
              required: true,
            })}
            type="file"
            placeholder="이미지"
            className="w-[220px] pl-2"
            onChange={(e) => saveFileImage(e)}
          />
        </div>
        {fileImage && (
          <img alt="sample" src={fileImage} className="w-[250px]" />
        )}
      </form>
    </div>
  );
}
