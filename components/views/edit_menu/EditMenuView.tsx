import { useState, useEffect, ChangeEvent } from 'react';
import axios from '@/lib/axios';
import Header from '@/components/common/Header';
import Nav from '@/components/common/mystore/Nav';
import MenuAdd from '@/components/edit_menu/MenuAdd';
import MenuDelete from '@/components/edit_menu/MenuDelete';

interface EditData {
  id: number;
  name: string;
  price: number;
  status: 'ON_SALE' | 'SOLD_OUT';
}

interface MenuItem extends EditData {
  imageUrl?: string | null;
}

interface MenuData {
  menuList: MenuItem[];
}

export default function EditMenuView() {
  const [restaurantId, setRestaurantId] = useState();
  const [menuData, setMenuData] = useState<MenuData>({ menuList: [] });

  const [isEditing, setIsEditing] = useState(false);
  const [editedMenu, setEditedMenu] = useState<EditData | null>(null);

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

  const editMenuInfo = async (editMenuInfo: {
    name: string;
    price: number;
  }) => {
    try {
      await axios.put(`/api/restaurants/menus/${editedMenu?.id}`, editMenuInfo);
      getMenuListData();
    } catch (error) {
      console.error('식당 메뉴 정보(이름, 가격) 수정', error);
    }
  };

  const editMenuStatus = async (status: { status: string }) => {
    try {
      await axios.put(
        `/api/restaurants/menus/${editedMenu?.id}/status`,
        status
      );
      getMenuListData();
    } catch (error) {
      console.error('메뉴 이미지 수정 ', error);
    }
  };

  const saveFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage = e.target.files[0];
      if (uploadedImage) {
        const imgFormData = new FormData();
        imgFormData.append('imageFile', uploadedImage, uploadedImage.name);

        try {
          await axios.post(
            `/api/restaurants/menus/${editedMenu?.id}/image`,
            imgFormData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
        } catch (error) {
          console.error('메뉴 이미지 수정 ', error);
        }
      }
    }
  };

  const handleEditClick = (menu: EditData) => {
    setEditedMenu(menu);
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editedMenu) {
      const { name, price, status } = editedMenu;
      editMenuInfo({ name, price });
      editMenuStatus({ status });

      setIsEditing(false);
      getMenuListData();
    }
  };

  return (
    <div className="flex">
      <Nav />
      <div className="w-full mt-5">
        <Header title="메뉴" isBack={false} />
        <div className="w-11/12 mx-auto">
          <table className="table mt-3">
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
                <tr key={data.id}>
                  <th>{index + 1}</th>
                  {isEditing && editedMenu && editedMenu.id === data.id ? (
                    <th>
                      <label htmlFor="imageFile">
                        {data.imageUrl ? (
                          <img
                            className="w-[40px] h-[40px] rounded-xl"
                            src={data.imageUrl}
                            alt="메뉴이미지"
                          />
                        ) : (
                          <img
                            className="w-[40px] h-[40px] rounded-xl"
                            src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                            alt="이미지없음"
                          />
                        )}
                      </label>
                      <input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={saveFile}
                      />
                    </th>
                  ) : (
                    <th>
                      {data.imageUrl ? (
                        <img
                          className="w-[40px] h-[40px] rounded-xl"
                          src={data.imageUrl}
                          alt="메뉴이미지"
                        />
                      ) : (
                        <img
                          className="w-[40px] h-[40px] rounded-xl"
                          src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                          alt="이미지없음"
                        />
                      )}
                    </th>
                  )}
                  {isEditing && editedMenu && editedMenu.id === data.id ? (
                    <th>
                      <input
                        type="text"
                        value={editedMenu.name}
                        onChange={(e) =>
                          setEditedMenu((prevEditedMenu) => {
                            if (prevEditedMenu) {
                              return {
                                ...prevEditedMenu,
                                name: e.target.value,
                              };
                            } else {
                              return null;
                            }
                          })
                        }
                      />
                    </th>
                  ) : (
                    <th>{data.name}</th>
                  )}
                  {isEditing && editedMenu && editedMenu.id === data.id ? (
                    <th>
                      <input
                        type="text"
                        value={editedMenu.price}
                        onChange={(e) =>
                          setEditedMenu((prevEditedMenu) => {
                            if (prevEditedMenu) {
                              return {
                                ...prevEditedMenu,
                                price: parseInt(e.target.value),
                              };
                            } else {
                              return null;
                            }
                          })
                        }
                      />
                    </th>
                  ) : (
                    <th>{data.price.toLocaleString()}원</th>
                  )}

                  {isEditing && editedMenu && editedMenu.id === data.id ? (
                    <th>
                      <select
                        value={editedMenu.status}
                        onChange={(e) =>
                          setEditedMenu((prevEditedMenu) => {
                            if (prevEditedMenu) {
                              return {
                                ...prevEditedMenu,
                                status: e.target.value as
                                  | 'ON_SALE'
                                  | 'SOLD_OUT',
                              };
                            } else {
                              return null;
                            }
                          })
                        }
                      >
                        <option value="ON_SALE">판매중</option>
                        <option value="SOLD_OUT">품절</option>
                      </select>
                    </th>
                  ) : (
                    <th>
                      {data.status === 'ON_SALE' ? (
                        <div>판매중</div>
                      ) : (
                        <div>품절</div>
                      )}
                    </th>
                  )}
                  <th>
                    {isEditing && editedMenu && editedMenu.id === data.id ? (
                      <button
                        className="btn mr-2 bg-blue-100"
                        onClick={handleEditSave}
                      >
                        저장
                      </button>
                    ) : (
                      <button
                        className="btn mr-2"
                        onClick={() => handleEditClick(data)}
                      >
                        수정
                      </button>
                    )}

                    <MenuDelete refresh={getMenuListData} menuId={data.id} />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <MenuAdd refresh={getMenuListData} />
        </div>
      </div>
    </div>
  );
}
