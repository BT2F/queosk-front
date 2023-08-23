interface MenuType {
  menuName: string;
  menuPrice: string;
}

export default function Menu({ menuName, menuPrice }: MenuType) {
  return (
    <>
      <div className="card card-compact w-48 bg-base-100 shadow-xl">
        <figure className="w-48">
          <img
            src="#"
            alt="이미지"
            width="200px"
            height="150px"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body">
          <p className="text-center text-bold">{menuName}</p>
          <p className="text-center">
            {menuPrice} <span>원</span>
          </p>
        </div>
      </div>
    </>
  );
}
