import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

interface FormData {
  image: File;
  name: string;
  price: number;
}

interface AddFormProps {
  menuData: (data: FormData) => void;
}
export default function AddForm({ menuData }: AddFormProps) {
  const [fileImage, setFileImage] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputFile, setInputFile] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);
  };

  const handleClick = () => {
    setFileImage('');
    setInputName('');
    setInputPrice('');
    setInputFile('');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newData = { imageUrl: fileImage, ...data };

    menuData(newData);
    handleClick();
  };

  const saveFileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    }
    setInputFile(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center ">
        <div className="font-semibold text-xl my-6">메뉴 등록</div>
        <button
          className="btn w-[80px] h-[33px] border-2 border-[#FBBD23] bg-[#FBBD23] rounded-2xl text-white"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          추가
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-[6px]">
          <input
            {...register('name', {
              required: true,
            })}
            type="text"
            placeholder="메뉴명"
            className="input input-bordered input-warning w-full max-w-xs"
            onChange={handleNameChange}
            value={inputName}
          />
          <input
            {...register('price', {
              required: true,
            })}
            type="text"
            placeholder="가격"
            className="input input-bordered input-warning w-full max-w-xs"
            onChange={handlePriceChange}
            value={inputPrice}
          />
        </div>
        <div className="flex justify-between">
          <input
            {...register('image', {
              required: false,
            })}
            type="file"
            placeholder="이미지"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={saveFileImage}
            value={inputFile}
          />
        </div>
        {fileImage && (
          <img alt="sample" src={fileImage} className="w-[250px]" />
        )}
      </form>
    </div>
  );
}
