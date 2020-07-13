import { getProductBySlug, searchProducts } from "../../lib/SimpleStore";
import { GetStaticProps, GetStaticPaths } from "next";

export default ({ product }) => {
  if (!product) return <h1>Loading..</h1>;

  return <h1>{product.title}</h1>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const product = await getProductBySlug(slug);

  return {
    props: { product },
    unstable_revalidate: 100,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // get all the active products in the catalog
  // pass the slugs into the path
  const search = await searchProducts({
    pageSize: 1000,
    pageIndex: 0,
    isActive: { value: true },
  });
  const { result } = search;
  const slugs = result.map((item) => `/p/${item.slug}`);

  return {
    paths: [...slugs],
    fallback: true,
  };
};

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   const product = await getProductBySlug(slug);
//   return {
//     props: { product },
//   };
// }
