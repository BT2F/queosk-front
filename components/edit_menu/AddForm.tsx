import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

interface FormData {
<<<<<<< HEAD
  image: File;
  name: string;
  price: number;
=======
  menuImg: File;
  menuName: string;
  menuPrice: string;
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
}

interface AddFormProps {
  menuData: (data: FormData) => void;
}
export default function AddForm({ menuData }: AddFormProps) {
  const [fileImage, setFileImage] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputFile, setInputFile] = useState('');

<<<<<<< HEAD
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
=======
  const handleNameChange = (event: any) => {
    setInputName(event.target.value);
  };

  const handlePriceChange = (event: any) => {
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
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
<<<<<<< HEAD
    const newData = { imageUrl: fileImage, ...data };
=======
    const newData = { fileImage, ...data };
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4

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
<<<<<<< HEAD
          className="btn w-[80px] h-[33px] border-2 border-[#FBBD23] bg-[#FBBD23] rounded-2xl text-white"
=======
          className="w-[80px] h-[33px] border-2 border-[#FBBD23] bg-[#FBBD23] rounded-2xl text-white"
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          추가
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-[6px]">
          <input
<<<<<<< HEAD
            {...register('name', {
=======
            {...register('menuName', {
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
              required: true,
            })}
            type="text"
            placeholder="메뉴명"
<<<<<<< HEAD
            className="input input-bordered input-warning w-full max-w-xs"
=======
            className="border border-zinc-400 rounded-lg pl-3 py-1"
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
            onChange={handleNameChange}
            value={inputName}
          />
          <input
<<<<<<< HEAD
            {...register('price', {
=======
            {...register('menuPrice', {
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
              required: true,
            })}
            type="text"
            placeholder="가격"
<<<<<<< HEAD
            className="input input-bordered input-warning w-full max-w-xs"
=======
            className="border border-zinc-400 rounded-lg pl-3 py-1"
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
            onChange={handlePriceChange}
            value={inputPrice}
          />
        </div>
        <div className="flex justify-between">
<<<<<<< HEAD
          <input
            {...register('image', {
              required: false,
            })}
            type="file"
            placeholder="이미지"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
=======
          <label
            htmlFor="fileInput"
            className="px-6 py-2 rounded-[4px] border-2 border-[#FBBD23] text-sm font-semibold text-[#FBBD23] cursor-pointer"
          >
            이미지 업로드
          </label>
          <input
            {...register('menuImg', {
              required: true,
            })}
            id="fileInput"
            type="file"
            placeholder="이미지"
            className="hidden"
>>>>>>> 5be381dcfb01b28623d7f6cd8017176fbc90cfd4
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
