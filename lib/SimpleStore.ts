import { create } from "apisauce";

const api = create({
  baseURL: "https://clients.api.simplestore.dev/",
  headers: { "x-api-key": "" },
});

export const getProductBySlug = async (slug: string | string[]) => {
  const response = await api.get<any>(`/v1/catalog/products/slugs/${slug}`);
  if (response.ok && response.data) {
    return response.data;
  }

  return null;
};

export const searchProducts = async (params?: any) => {
  const response = await api.post<any>("/v1/catalog/products/search", {
    ...params,
  });
  if (response.ok && response.data) {
    return response.data;
  }

  return null;
};
