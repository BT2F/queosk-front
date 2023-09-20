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
  const [inputStatus, setInputStatus] = useState<'판매중' | '품절'>('판매중');

  //input reset
  // const [inputName, setInputName] = useState('');
  // const [inputPrice, setInputPrice] = useState('');
  // const [inputFile, setInputFile] = useState('');

  // useEffect(() => {
  //   if (isEditMode && editingMenuData) {
  //     setInputName(editingMenuData?.name);
  //     setInputPrice(editingMenuData.price.toString());
  //     setImageUrlSave(editingMenuData.imageUrl || '');
  //   } else {
  //     setImageUrlSave('');
  //     //setInputName('');
  //     //setInputPrice('');
  //   }
  // }, [isEditMode, editingMenuData]);

  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputName(event.target.value);
  // };

  // const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputPrice(event.target.value);
  // };

  // const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setInputStatus(event.target.value as '판매중' | '품절');
  // };

  // const handleClick = () => {
  //   setImageUrlSave('');
  //   //setInputName('');
  //   //setInputPrice('');
  //   setInputFile('');
  // };

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newData = {
      imageUrl: imageUrlSave,
      imageFile: imageFileSave,
      ...data,
      //price: parseFloat(inputPrice),
    };
    menuData(newData);
    //handleClick();
  };

  // useEffect(() => {
  //   console.log(imageFileSave);
  // }, [imageFileSave]);

  // useEffect(() => {
  //   console.log(inputFile);
  // }, [inputFile]);
  // useEffect(() => {
  //   console.log(imageFileSave);
  // }, [imageFileSave]);

  // useEffect(() => {
  //   console.log(imageUrlSave);
  // }, [imageUrlSave]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const saveFileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //setInputFile(e.target.value);
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
    e.target.files = null;
  };

  return (
    <div>
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
            //onChange={handleNameChange}
            //value={inputName}
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
            //onChange={handlePriceChange}
            //value={inputPrice}
          />

          <label className="label" htmlFor="fileInput">
            <span className="label-text font-bold">이미지</span>
          </label>
          <input
            {...register('image', {
              required: false,
            })}
            id="fileInput"
            type="file"
            placeholder="이미지"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            onChange={saveFileImage}
            //value={inputFile}
            accept="image/*"
          />

          {isEditMode && (
            <div>
              <label className="label" htmlFor="menuState">
                <span className="label-text font-bold">상태</span>
              </label>
              <select
                {...register('status', {
                  required: true,
                })}
                className="input input-bordered input-warning w-1/3 max-w-xs"
                //onChange={handleStatusChange}
                value={inputStatus}
                id="menuState"
              >
                <option value="ON_SALE">판매중</option>
                <option value="SOLD_OUT">품절</option>
              </select>
            </div>
          )}
          {imageUrlSave && (
            <img
              alt="sample"
              src={imageUrlSave}
              className="w-[250px] my-4 mx-auto"
            />
          )}
        </div>
      </form>
      <button
        className=" flex btn w-[330px] border-2 rounded-2xl bg-base-200 mx-auto"
        type="submit"
        //onClick={handleSubmit(onSubmit)}
        onClick={() => reset()}
      >
        {isEditMode ? '수정' : '추가'}
      </button>
    </div>
  );
}
