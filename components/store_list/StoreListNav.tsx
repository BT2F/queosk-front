import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { STORE_CATEGORY_KEY, STORE_LIST_KEY } from '@/constants/store_list';
import { useQueryClient } from '@tanstack/react-query';

const categoryList = ['전체', '한식', '중식', '일식', '양식'] as const;
export default function StoreListNav() {
  const router = useRouter();
  const [category, setCategory] = useState('ALL');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const onClick = useCallback(() => {
    router.replace(`?category=${category}&title=${inputRef.current?.value}`);
    queryClient.invalidateQueries({ queryKey: [STORE_LIST_KEY.STORE_LIST] });
  }, [category, inputRef]);

  return (
    <div className="flex gap-2 mt-5">
      <select
        className="select select-bordered select-sm"
        defaultValue="ALL"
        onChange={(e) => setCategory(e.target.value)}
      >
        {categoryList.map((v) => (
          <option key={`store_category_key_${v}`} value={STORE_CATEGORY_KEY[v]}>
            {v}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="input input-sm input-bordered w-full"
        ref={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      />
      <button
        className="w-24 btn btn-sm bg-yellow-400 hover:bg-yellow-300"
        onClick={onClick}
      >
        검색
      </button>
    </div>
  );
}
