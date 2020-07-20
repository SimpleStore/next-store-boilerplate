import { useContext } from "react";
import { WebsiteContext } from "../../store/WebsiteContext";

export const CartStatus = () => {
  const { cart } = useContext(WebsiteContext);

  return <span>total: ${cart?.totalCurrency}</span>;
};
