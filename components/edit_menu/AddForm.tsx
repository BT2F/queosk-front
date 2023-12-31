import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface FormData {
  image: File | undefined;
  name: string;
  price: number;
  imageUrl?: string;
  status?: 'ON_SALE' | 'SOLD_OUT';
}

interface EditDataType {
  id?: number;
  imageUrl?: string | null;
  name: string;
  price: number;
  restaurantId?: number;
  status?: 'ON_SALE' | 'SOLD_OUT';
}

interface AddFormProps {
  menuData: (data: FormData, menuIndex?: number | null) => void;
  isEditMode: boolean;
  editingMenuData: EditDataType | null;
  setImageUrl: (p: string) => void;
}
export default function AddForm({
  menuData,
  isEditMode,
  editingMenuData,
  setImageUrl,
}: AddFormProps) {
  const [imageUrlSave, setImageUrlSave] = useState('');
  const [imageFileSave, setImageFileSave] = useState<File>();
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputFile, setInputFile] = useState('');
  const [inputStatus, setInputStatus] = useState<'판매중' | '품절'>('판매중');

  useEffect(() => {
    if (isEditMode && editingMenuData) {
      setInputName(editingMenuData?.name);
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

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputStatus(event.target.value as '판매중' | '품절');
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
      price: parseFloat(inputPrice),
    };
    menuData(newData);
    handleClick();
  };
  useEffect(() => {
    console.log(imageFileSave);
  }, [imageFileSave]);

  useEffect(() => {
    console.log(inputFile);
  }, [inputFile]);
  useEffect(() => {
    console.log(imageFileSave);
  }, [imageFileSave]);

  useEffect(() => {
    console.log(imageUrlSave);
  }, [imageUrlSave]);

  const saveFileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInputFile(e.target.value);
      const uploadedImage = e.target.files[0];
      setImageFileSave(uploadedImage);
      if (uploadedImage) {
        const imageUrl = URL.createObjectURL(uploadedImage);
        setImageUrlSave(imageUrl);

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
            className="file-input file-input-bordered file-input-warning w-2/3 max-w-xs"
            onChange={saveFileImage}
            value={inputFile}
            id="fileInput"
          />
          {isEditMode && (
            <select
              {...register('status', {
                required: true,
              })}
              className="input input-bordered input-warning w-1/3 max-w-xs"
              onChange={handleStatusChange}
              value={inputStatus}
            >
              <option value="ON_SALE">판매중</option>
              <option value="SOLD_OUT">품절</option>
            </select>
          )}
        </div>
        {imageUrlSave && (
          <img alt="sample" src={imageUrlSave} className="w-[250px]" />
        )}
      </form>
    </div>
  );
}
