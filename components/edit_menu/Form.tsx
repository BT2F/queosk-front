import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface addDataType {
  name: string;
  price: number;
  imageUrl: string;
}

interface FormData extends addDataType {
  status: 'ON_SALE' | 'SOLD_OUT';
  imageFile: File;
}

interface Props {
  refresh: () => void;
}
export default function Form({ refresh }: Props) {
  const [addData, setAddData] = useState<addDataType>();
  const [imageUrl, setImageUrl] = useState('');

  const saveFileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage = e.target.files[0];
      if (uploadedImage) {
        const imgFormData = new FormData();
        imgFormData.append('imageFile', uploadedImage, uploadedImage.name);

        try {
          const response = await axios.post(
            '/api/restaurants/menus/image',
            imgFormData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
          setImageUrl(response.data.imageUrl);
        } catch (error) {
          console.error('메뉴 이미지 업로드 후 가져오기', error);
        }
      }
    }
  };
  const addNewMenu = async () => {
    try {
      const response = await axios.post('/api/restaurants/menus', addData);
      const data = response.data;
      console.log(data);
      refresh();
      reset();
    } catch (error) {
      console.error('식당 메뉴 목록 추가', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setAddData({
      name: data.name,
      price: data.price,
      imageUrl: imageUrl,
    });

    if (isSubmitSuccessful) {
      reset();
    }
  };

  useEffect(() => {
    if (addData) {
      console.log(addData);
      addNewMenu();
    }
  }, [addData]);

  return (
    <div className="h-full flex flex-col justify-center gap-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[330px] mx-auto gap-2">
          <label className="label w-full" htmlFor="menuName">
            <span className="label-text font-bold">메뉴명</span>
          </label>
          <input
            {...register('name', {
              required: true,
            })}
            id="menuName"
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
          />

          <label className="label w-full" htmlFor="menuPrice">
            <span className="label-text font-bold">가격</span>
          </label>
          <input
            {...register('price', {
              required: true,
            })}
            id="menuPrice"
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
          />

          <label className="label" htmlFor="fileInput">
            <span className="label-text font-bold">이미지</span>
          </label>
          <input
            {...register('imageFile', {
              required: false,
            })}
            id="fileInput"
            type="file"
            placeholder="이미지"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            onChange={saveFileImage}
            accept="image/*"
          />
        </div>
      </form>
      <button
        className=" flex btn w-[330px] border-2 rounded-2xl bg-base-200 mx-auto"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        추가
      </button>
    </div>
  );
}
