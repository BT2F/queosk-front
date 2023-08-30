import StarRate from '@/components/store_select_and_detail/StarRate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Comment {
  text: string;
  rating: number;
}

export default function StoreDetailPageView() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const router = useRouter();

  const { storeId } = router.query;

  const handleAddComment = () => {
    if (newComment) {
      const newCommentObj = { text: newComment, rating: 4.5 }; //예시
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  return (
    <>
      <h1 className="text-xl text-center pt-10 pb-10">매장명</h1>
      <div className="flex justify-center border-solid">
        <div className="flex flex-col justify-center items-center basis-1/3">
          <figure className="rounded-lg mb-3">
            <img
              src="#"
              alt="img"
              className="object-cover"
              width="150px"
              height="150px"
            />
          </figure>
          <StarRate ratingSize="rating-md" />
          <div className="mt-1">(4.5/5.0)</div>
        </div>
        <div className="basis-2/3">
          <h4 className="mb-5">매장 상세정보</h4>
          <p>주소 : 주소</p>
          <p>전화번호 : 전화번호</p>
          <p>영업시간 : 영업시간</p>
          <p>홈페이지 : 홈페이지</p>
          <Link href={`/store/${storeId}/waiting`}>
            <button className="btn btn-active bg-yellow-400 mt-5 w-11/12">
              웨이팅 신청하러 가기
            </button>
          </Link>
        </div>
      </div>
      <div className="divider mt-10 mb-10"></div>
      <p className="ps-10">여러분의 소중한 별점과 리뷰를 남겨주세요</p>
      <div className="flex justify-end me-10 mb-2">
        <span className="me-3">별점 :</span>
        <StarRate ratingSize="rating-md" />
      </div>
      <div className="flex justify-center">
        <textarea
          className="textarea textarea-bordered w-9/12"
          placeholder="별점을 입력하신 뒤 여기에 리뷰를 남겨주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="btn btn-active btn-neutral w-2/12 h-20"
          onClick={handleAddComment}
        >
          입력
        </button>
      </div>
    </>
  );
}
