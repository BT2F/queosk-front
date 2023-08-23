import { useState } from 'react';

export interface MenuInCartType {
  menuName: string;
  price: number;
  imgSrc: string;
}

export default function MenuInCart({
  menuName,
  price,
  imgSrc,
}: MenuInCartType) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddOrder = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtractOrder = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="card card-side bg-base-100 w-9/12 shadow-xl mb-3">
          <figure className="w-3/12">
            <img
              src="#"
              alt={imgSrc}
              width="150px"
              height="150px"
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{menuName}</h2>
            <p>{price}</p>
          </div>
          <div className="flex flex-col justify-between p-2">
            <button className="btn btn-md btn-outline btn-error w-20 ms-auto">
              삭제
            </button>
            <div className="mt-5">
              <button
                className="btn btn-md btn-active btn-neutral"
                onClick={handleAddOrder}
              >
                +
              </button>
              <span className="inline-block w-10 text-center text-xl">
                {quantity}
              </span>
              <button
                className="btn btn-md btn-active btn-neutral"
                onClick={handleSubtractOrder}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
