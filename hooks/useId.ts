import { useState } from 'react';

let idCnt = 0;

export const generateId = (prefix = 'queosk-id') => {
  idCnt += 1;
  return `${prefix}-${idCnt}`;
};

export default function useId(prefix?: string) {
  //여러곳에서 동시 호출할 때 발생할 수 있는 useState의 처리방식을 고려하여 다음과 같이 작성했습니다.
  const [id] = useState(() => generateId(prefix));

  return id;
}
