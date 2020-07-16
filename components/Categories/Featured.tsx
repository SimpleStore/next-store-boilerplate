import { ICategoryTreeItem, IFile } from "../../lib/Interfaces";
import { firstImage } from "../../lib/Util";

interface IProps {
  featuredCategories: ICategoryTreeItem[];
}

export const FeaturedCategories = ({ featuredCategories }: IProps) => {
  const category =
    featuredCategories &&
    featuredCategories.length > 0 &&
    featuredCategories[0];

  return (
    <>
      <span className="px-1 text-2xl text-gray-600">Featured Categories</span>
      <div className="flex flex-row">
        {category &&
          category.children &&
          category.children.map((item) => {
            const image = firstImage(item.files);
            return (
              <div className="p-4" key={item.categoryId}>
                <h3>
                  <a href={`/c/${item.slug}`}>{item.name}</a>
                </h3>
                <img
                  className="mt-3 rounded-lg shadow-xl"
                  src={`${image.edgeUrl}/fit-in/400x400/${image.accessUrl}`}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};
