import { ICart } from "../../lib/Interfaces";
import * as Actions from "./Actions";

export const cartReducer = (state: ICart, action) => {
  console.log("action: ", action);
  switch (action.type) {
    case Actions.CART_LOADED:
    case Actions.CART_ITEM_ADDED:
      return { ...action.payload };
    case Actions.CART_ITEM_REMOVED:
      return { ...action.payload };

    default:
      throw new Error();
  }
};
