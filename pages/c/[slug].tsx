import { GetStaticProps, GetStaticPaths } from "next";
import { searchProducts, getCategoryBySlug } from "../../lib/SimpleStore";
import { ISearchResult, IProduct, ICategory } from "../../lib/Interfaces";
import { firstImage } from "../../lib/Util";

interface IProps {
  products: ISearchResult<IProduct>;
  category: ICategory;
}

export default ({ products, category }: IProps) => {
  console.log(products, category);
  if (!products || !category) return <h1>Loading..</h1>;

  return (
    <div>
      <h1 className="px-1 text-2xl text-gray-600">{category.name}</h1>
      <ul className="flex">
        {products.result &&
          products.result.map((item) => {
            const image = firstImage(item.files);
            return (
              <li className="flex-col px-4 py-3" key={item.productId}>
                <a className="mt-2 text-gray-600" href={`/p/${item.slug}`}>
                  {item.title}
                </a>
                {image && (
                  <img
                    className="mt-3 rounded-lg shadow-xl"
                    src={`${image.edgeUrl}/fit-in/400x400/${image.accessUrl}`}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const products = await searchProducts({
    pageSize: 9,
    pageIndex: 0,
    categorySlugs: {
      value: [slug],
    },
    isActive: { value: true },
  });

  const category = await getCategoryBySlug(slug);

  return {
    props: { products, category },
    unstable_revalidate: 100,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // get all the active products in the catalog
  // pass the slugs into the path
  //   const search = await searchProducts({
  //     pageSize: 1000,
  //     pageIndex: 0,
  //     isActive: { value: true },
  //   });
  //   const { result } = search;
  //   const slugs = result.map((item) => `/p/${item.slug}`);

  return {
    paths: [],
    fallback: true,
  };
};
