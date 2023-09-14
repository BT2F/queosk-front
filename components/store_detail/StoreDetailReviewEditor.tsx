export default function StoreDetailReviewEditor() {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl"> 여러분의 소중한 별점과 리뷰를 남겨주세요!</h3>

      <form className="flex flex-col gap-3 mt-5">
        <div className="flex items-center justify-center">
          별점 :
          <div className="rating rating-md ml-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <input
                key={`store_star_${i}`}
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
            ))}
          </div>
        </div>
        <textarea
          placeholder="리뷰 남기기"
          className="textarea textarea-bordered textarea-md w-full resize-none"
        />
        <button
          className="btn btn-md bg-yellow-400 hover:bg-yellow-300 duration-300"
          type={'button'}
        >
          리뷰 남기기
        </button>
      </form>
    </div>
  );
}
