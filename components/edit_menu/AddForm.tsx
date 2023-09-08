import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';

interface FormData {
  image: File;
  name: string;
  price: number;
  imageUrl?: string;
}

interface AddFormProps {
  menuData: (data: FormData, menuIndex?: number | null) => void;
  isEditMode: boolean;
  editingMenuData: FormData | null;
}
export default function AddForm({
  menuData,
  isEditMode,
  editingMenuData,
}: AddFormProps) {
  const [imageUrlSave, setImageUrlSave] = useState('');
  const [imageFileSave, setImageFileSave] = useState<File>();
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputFile, setInputFile] = useState('');

  useEffect(() => {
    if (isEditMode && editingMenuData) {
      setInputName(editingMenuData.name);
      setInputPrice(editingMenuData.price.toString());
      setImageUrlSave(editingMenuData.imageUrl || '');
    } else {
      setImageUrlSave('');
      setInputName('');
      setInputPrice('');
    }
  }, [isEditMode, editingMenuData]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);
  };

  const handleClick = () => {
    setImageUrlSave('');
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
    const newData = {
      imageUrl: imageUrlSave,
      imageFile: imageFileSave,
      ...data,
    };
    console.log(newData);
    menuData(newData);
    handleClick();
  };

  const saveFileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrlSave(URL.createObjectURL(e.target.files[0]));
      setImageFileSave(e.target.files[0]);
      console.log(e.target.files[0]);
    }
    setInputFile(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center ">
        <div className="font-semibold text-xl my-6">
          {isEditMode ? '메뉴 편집' : '메뉴 등록'}
        </div>
        <button
          className="btn w-[80px] h-[33px] border-2 border-[#FBBD23] bg-[#FBBD23] rounded-2xl text-white"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {isEditMode ? '수정' : '추가'}
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
        {imageUrlSave && (
          <img alt="sample" src={imageUrlSave} className="w-[250px]" />
        )}
      </form>
    </div>
  );
}
