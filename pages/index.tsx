import { GetStaticProps } from "next";
import { Slider, FeaturedCategories } from "../components";
import { getCategoryTree } from "../lib/SimpleStore";
import { ICategoryTreeItem } from "../lib/Interfaces";

interface IProps {
  featuredCategories: ICategoryTreeItem[];
}

export default (props: IProps) => {
  console.log("props: ", props);

  return (
    <>
      <Slider>
        <div className="block h-64 text-gray-700">
          <h1>Slider 1</h1>
        </div>
        <div>
          <h1>Slider 2</h1>
        </div>
      </Slider>
      <FeaturedCategories {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredCategories = await getCategoryTree("catalog:categories:1128:a");

  return {
    props: { featuredCategories },
    unstable_revalidate: 100,
  };
};
