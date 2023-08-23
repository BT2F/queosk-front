interface storeListType {
  id?: number;
  title: string;
  imgSrc: string;
  address: string;
  phone?: string;
  homepage?: string;
}

export default function StoreLists({ imgSrc, title, address }: storeListType) {
  return (
    <div className="card card-side bg-base-100 w-11/12 shadow-xl mb-3">
      <figure className="w-3/12">
        <img src="#" alt={imgSrc} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{address}</p>
      </div>
    </div>
  );
}
