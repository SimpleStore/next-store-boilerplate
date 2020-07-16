import { createContext, useState, useReducer, useEffect } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

import { ICart } from "../lib/Interfaces";

import { cartReducer } from "./Cart/Reducer";
import * as Actions from "./Cart/Actions";

interface IWebsiteContext {
  cart: ICart;
  addToCart: (productId: string, quantity: number) => void;
}

export const WebsiteContext = createContext<IWebsiteContext>(null);
WebsiteContext.displayName = "WebsiteContext";

export const WebsiteProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["cartId"]);

  console.log("cookie: ", cookies);
  let { cartId } = cookies;
  if (!cartId) {
    // we dont have a cart id
    // generate a new one and save it in the cookie

    const date = new Date();
    date.setDate(date.getDate() + 14);
    cartId = uuidv4();
    setCookie("cartId", cartId, { path: "/", expires: date });
  }

  const [cart, cartDispatch] = useReducer(cartReducer, null);

  const loadCart = async (cartId: string) => {
    cartDispatch(await Actions.loadCart(cartId));
  };

  useEffect(() => {
    if (cartId) {
      loadCart(cartId);
    }
  }, [cartId]);

  return (
    <WebsiteContext.Provider
      value={{
        cart,
        addToCart: async (productId: string, quantity: number) =>
          cartDispatch(await Actions.addToCart(cartId, productId, quantity)),
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};
