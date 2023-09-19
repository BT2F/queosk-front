import AddForm from '@/components/edit_menu/AddForm';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Header from '@/components/common/Header';

interface NewDataType {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  imageFile?: File;
}
interface EditDataType {
  id?: number;
  imageUrl?: string | null;
  name: string;
  price: number;
  restaurantId?: number;
  status?: 'ON_SALE' | 'SOLD_OUT';
}

interface MenuItem {
  id: number;
  name: string;
  imageUrl: string | null;
  price: number;
  status: 'ON_SALE' | 'SOLD_OUT';
}

interface MenuData {
  menuList: MenuItem[];
}

interface addMenuType {
  imageUrl: string;
  name: string;
  price: number;
}
interface updateMenuType {
  name?: string;
  price?: number;
  imageUrl?: string;
  imageFile?: File;
  status?: string;
}

export default function EditMenuView() {
  const [checkedMenu, setCheckedMenu] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<MenuData>({ menuList: [] });
  const [newMenuData, setNewMenuData] = useState<addMenuType>();
  const [newImage, setNewImage] = useState<NewDataType>();
  const [nextId, setNextId] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState('');
  const [restaurantId, setRestaurantId] = useState<number>();

  //메뉴 편집
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editingMenu, setEditingMenu] = useState<EditDataType | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);

  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('/api/restaurants');
      const data = response.data;
      setRestaurantId(data.id);
    } catch (error) {
      console.error('매장 정보', error);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  //(1)식당 메뉴 목록 조회
  const getMenuListData = async () => {
    try {
      if (restaurantId !== undefined) {
        const response = await axios.get(
          `/api/restaurants/${restaurantId}/menus`
        );
        const data = response.data;
        setMenuData(data);
      }
    } catch (error) {
      console.error('식당 메뉴 목록 조회', error);
    }
  };

  useEffect(() => {
    getMenuListData();
  }, [restaurantId]);

  //(2)식당 메뉴 목록 추가
  const addNewMenu = async () => {
    try {
      const response = await axios.post('/api/restaurants/menus', newMenuData);
      const data = response.data;
      getMenuListData();
    } catch (error) {
      console.error('식당 메뉴 목록 추가', error);
    }
  };
  useEffect(() => {
    if (newMenuData) {
      console.log(newMenuData);
      addNewMenu();
    }
  }, [newMenuData]);

  //(4)메뉴 삭제
  const deleteMenu = async () => {
    try {
      await axios.delete(`/api/restaurants/menus/${menuId}`);
      getMenuListData();
      setCheckedMenu([]);
      setMenuId(null);
    } catch (error) {
      console.error('메뉴 삭제', error);
    }
  };
  const handleDelete = () => {
    if (checkedMenu != null && checkedMenu.length > 0) {
      if (menuId != null) {
        deleteMenu();
      }
    }
  };
  useEffect(() => {
    const menuId = checkedMenu[0];
    setMenuId(menuId);
  }, [checkedMenu]);

  //(5)식당 메뉴 정보(이름, 가격) 수정
  const editMenuInfo = async (editMenuInfo: updateMenuType) => {
    try {
      await axios.put(`/api/restaurants/menus/${menuId}`, editMenuInfo);
      getMenuListData();
    } catch (error) {
      console.error('식당 메뉴 정보(이름, 가격) 수정', error);
    }
  };
  //(6)메뉴 주문가능여부 상태 수정
  const editMenuStatus = async (status: updateMenuType) => {
    try {
      await axios.put(`/api/restaurants/menus/${menuId}/status`, status);
      getMenuListData();
    } catch (error) {
      console.error('메뉴 이미지 수정 ', error);
    }
  };

  //(7)메뉴 이미지 수정
  const editMenuImage = async (file: any) => {
    const imgFormData = new FormData();
    imgFormData.append('imageFile', file.imageFile);
    console.log('이미지 ', imgFormData.get('imageFile'));

    try {
      await axios.post(`/api/restaurants/menus/${menuId}/image`, imgFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error('메뉴 이미지 수정 ', error);
    }
  };

  const handleUpdateMenu = (editData: updateMenuType) => {
    if (checkedMenu.length > 0) {
      setMenuId(menuId);
      const { name, price, status, imageFile } = editData;
      if (menuId != null) {
        editMenuInfo({ name, price });
        editMenuStatus({ status });
        if (imageFile != undefined) {
          editMenuImage({ imageFile });
        }
      }
    }
  };

  const getInfo = (data: any) => {
    console.log(data);
    const { name, price, imageFile, status } = data;
    const newData = { imageUrl, name, price };
    const editData = { name, price, imageUrl, imageFile, status };
    setNextId(nextId + 1);
    if (isEditClicked === true && checkedMenu.length > 0) {
      handleUpdateMenu(editData);
    } else {
      setNewMenuData(newData);
      setNewImage(imageFile);
    }
    setIsEditClicked(false);
    setCheckedMenu([]);
  };

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedMenu((prev) => [...prev, id.toString()]);
    } else {
      setCheckedMenu(checkedMenu.filter((el) => el !== id.toString()));
    }
  };

  const handleEditClick = () => {
    if (checkedMenu.length > 0) {
      const firstMenu = menuData.menuList.find(
        (menu) => menu.id?.toString() === checkedMenu[0]
      );
      if (firstMenu) {
        setIsEditClicked(true);
        setEditingMenu(firstMenu);
        console.log(editingMenu);
      }
    }
  };

  return (
    <div className="relative">
      <div className="w-4/5 mx-auto my-0">
        {/* <AddForm
        menuData={getInfo}
        isEditMode={isEditClicked}
        editingMenuData={editingMenu}
        setImageUrl={setImageUrl}
      /> */}
        <Header title="메뉴" />
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이미지</th>
                  <th>메뉴명</th>
                  <th>가격</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {menuData.menuList.map((data, index) => (
                  <tr key={index}>
                    <th>{data.id}</th>
                    <th>
                      {data.imageUrl ? (
                        <img
                          className="w-[40px] h-[40px] mx-auto rounded-xl"
                          src={data.imageUrl}
                          alt="메뉴이미지"
                        />
                      ) : (
                        <img
                          className="w-[40px] h-[40px] mx-auto rounded-xl"
                          src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                          alt="이미지없음"
                        />
                      )}
                    </th>
                    <th>{data.name}</th>
                    <th>{data.price.toLocaleString()}</th>
                    <th>
                      {data.status === 'ON_SALE' ? (
                        <div>판매중</div>
                      ) : (
                        <div>품절</div>
                      )}
                    </th>
                    <th>
                      <button className="btn">편집</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isEditClicked && (
        <div className="flex fixed inset-x-0 bottom-0">
          <div
            className="grid h-20 flex-grow bg-base-200 place-items-center text-sky-500 font-bold hover:bg-base-400"
            onClick={handleEditClick}
          >
            수정
          </div>
          <div className="divider divider-horizontal mx-0 w-0" />
          <div
            className="grid h-20 flex-grow bg-base-200 place-items-center text-red-500 font-bold hover:bg-base-400"
            onClick={handleDelete}
          >
            삭제
          </div>
        </div>
      )}
    </div>
  );
}
