interface StarRateProps {
  ratingSize: string;
}

export default function StarRate(props: StarRateProps) {
  const { ratingSize } = props;
  return (
    <div
      className={`rating rating-half ${ratingSize} flex justify-center items-center`}
    >
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
      />
    </div>
  );
}
