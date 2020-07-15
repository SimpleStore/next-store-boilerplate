import { useState, ChangeEvent } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { FormattedNumber } from "react-intl";
import {
  getProductBySlug,
  searchProducts,
  addToCart,
} from "../../lib/SimpleStore";
import { IProduct } from "../../lib/Interfaces";

interface IProps {
  product: IProduct;
}

export default ({ product }: IProps) => {
  console.log(product);

  const [quantity, setQuantity] = useState("1");

  if (!product) return <h1>Loading..</h1>;

  const handleQuantityChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.currentTarget.value);
  };

  const handleAddToCartClicked = async () => {
    const cart = await addToCart(product.productId, Number(quantity));
    console.log("cart: ", cart);
  };

  return (
    <>
      <h1>{product.title}</h1>

      <div>
        images:
        <ul>
          {product.files &&
            product.files.map((item) => {
              return (
                <li key={item.fileId}>
                  <img
                    src={`${item.edgeUrl}/fit-in/400x400/${item.accessUrl}`}
                  />
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        {product.price && (
          <FormattedNumber
            value={product.price.sellPrice}
            style="currency"
            currency={product.price.currencyCode}
          />
        )}
        <br />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChanged}
        />
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={handleAddToCartClicked}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
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
