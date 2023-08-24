interface MenuCategoryType {
  categoryName: string;
}

export default function MenuCategory(props: MenuCategoryType) {
  const { categoryName } = props;
  return (
    <>
      <button className="btn btn-active btn-ghost w-28 h-12 text-center rounded-lg">
        {categoryName}
      </button>
    </>
  );
}
