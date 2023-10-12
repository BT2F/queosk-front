import axios from '@/lib/axios';

interface Props {
  menuId: number;
  refresh: () => void;
}

export default function MenuDelete({ menuId, refresh }: Props) {
  const deleteMenu = async () => {
    try {
      await axios.delete(`/api/restaurants/menus/${menuId}`);
      refresh();
    } catch (error) {
      console.error('메뉴 삭제', error);
    }
  };

  return (
    <button className="btn mr-2" onClick={deleteMenu}>
      삭제
    </button>
  );
}
