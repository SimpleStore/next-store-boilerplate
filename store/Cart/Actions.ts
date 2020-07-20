import * as Services from "../../lib/SimpleStore";

export const CART_LOADED = "CART_LOADED";
export const CART_ITEM_ADDED = "CART_ITEM_ADDED";
export const CART_ITEM_REMOVED = "CART_ITEM_REMOVED";
export const CART_DELETED = "CART_DELETED";

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

export const removeFromCart = async (cartId: string, productId: string) => {
  const response = await Services.removeFromCart(cartId, productId);
  return { type: CART_ITEM_REMOVED, payload: { ...response } };
};

export const deleteCart = async (cartId: string) => {
  const response = await Services.deleteCart(cartId);
  if (response) return { type: CART_DELETED, payload: {} };
  else return { type: null, payload: {} };
};
