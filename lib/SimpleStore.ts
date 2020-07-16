import { create } from "apisauce";
import {
  ICategoryTreeItem,
  ICategory,
  ISearchResult,
  IProduct,
  ICart,
} from "./Interfaces";

const api = create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
});

export const getProductBySlug = async (slug: string | string[]) => {
  const response = await api.get<IProduct>(
    `/v1/catalog/products/slugs/${slug}`
  );
  if (response.ok && response.data) {
    return response.data;
  }

  return null;
};

export const searchProducts = async (params?: any) => {
  const response = await api.post<ISearchResult<IProduct>>(
    "/v1/catalog/products/search",
    {
      ...params,
    }
  );
  if (response.ok && response.data) {
    return response.data;
  }

  return null;
};

export const getCategoryTree = async (rootCategoryId: string) => {
  const response = await api.post<ICategoryTreeItem>(
    "/v1/catalog/categories/tree",
    {
      rootCategoryId: [rootCategoryId],
      includeFiles: true,
      isActive: true,
    }
  );

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
};

export const getCategoryBySlug = async (slug: string | string[]) => {
  const response = await api.get<ICategory>(
    `/v1/catalog/categories/slugs/${slug}`
  );
  if (response.ok && response.data) return response.data;

  return null;
};

export const addToCart = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  const response = await api.post<ICart>(`/v1/cart/${cartId}/items`, {
    productId,
    quantity,
  });

  if (response.ok && response.data) return response.data;

  return null;
};
export const removeFromCart = async (cartId: string, productId: string) => {
  const response = await api.post<ICart>(`/v1/cart/${cartId}/items`, {
    productId,
  });

  if (response.ok && response.data) return response.data;

  return null;
};

export const loadCart = async (cartId: string) => {
  const response = await api.get<ICart>(`/v1/cart/${cartId}`);
  if (response.ok && response.data) return response.data;

  return null;
};
