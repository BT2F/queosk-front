interface MenuCategoryType {
  categoryName: string;
}

export default function MenuCategory(props: MenuCategoryType) {
  const { categoryName } = props;
  return (
    <>
      <div className="flex justify-center items-center w-28 h-12 text-center rounded-lg bg-neutral-300">
        {categoryName}
      </div>
    </>
  );
}
