import * as Services from "../../lib/SimpleStore";

export const CART_LOADED = "CART_LOADED";
export const CART_ITEM_ADDED = "CART_ITEM_ADDED";

export const loadCart = async (cartId: string) => {
  return { type: CART_LOADED, payload: await Services.loadCart(cartId) };
};

export const addToCart = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  const response = await Services.addToCart(cartId, productId, quantity);
  return { type: CART_ITEM_ADDED, payload: { ...response } };
};
