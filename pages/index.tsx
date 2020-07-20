import { GetStaticProps } from "next";
import { Slider, FeaturedCategories } from "../components";
import { getCategoryTree, searchProducts } from "../lib/SimpleStore";
import { ISearchResult, ICategoryTreeItem, IProduct } from "../lib/Interfaces";

interface IProps {
  featuredCategories: ICategoryTreeItem[];
  featuredProducts: ISearchResult<IProduct>;
}

export default (props: IProps) => {
  console.log("props: ", props);

  return (
    <>
      <Slider {...props}></Slider>

      <FeaturedCategories {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredCategories = await getCategoryTree("catalog:categories:127:a");

  const featuredProdIds = ["catalog:products:375:a", "catalog:products:441:a"];
  const featuredProducts = await searchProducts({
    pageSize: 10,
    pageIndex: 0,
    productIds: {
      value: featuredProdIds,
    },
    isActive: { value: true },
  });

  return {
    props: { featuredProducts, featuredCategories },
    unstable_revalidate: 100,
  };
};
