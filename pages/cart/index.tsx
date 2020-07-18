import { useContext } from "react";
import { FormattedNumber } from "react-intl";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import { WebsiteContext } from "../../store/WebsiteContext";
import { checkoutCart } from "../../lib/SimpleStore";

let stripePromise: Promise<Stripe> = null;

export default () => {
  const { cart, removeFromCart } = useContext(WebsiteContext);

  const handleRemoveFromCartClicked = async (productId: string) => {
    // const cart = await addToCart(product.productId, Number(quantity));
    // console.log("cart: ", cart);
    removeFromCart(productId);
  };

  const handleCheckout = async () => {
    const { cartId } = cart;
    const { sessionId, stripePublishableKey } = await checkoutCart(cartId);

    if (!stripePromise) {
        stripePromise = loadStripe(stripePublishableKey);
    }

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
        sessionId,
    });

    console.error('stripe error: ', error);
    console.log('Session Id', sessionId);
    
  };

  return (
    <>
      <h1>View Cart</h1>
      <ul>
        {cart &&
          cart.items &&
          cart.items.map((item) => (
            <li key={item.productId}>
              <div>
                <span>{item.title}</span>
                <br />
                <span>
                  {item.quantity} x{" "}
                  <FormattedNumber
                    value={item.price.sellPrice}
                    style="currency"
                    currency={item.price.currencyCode}
                  />
                </span>
                <br />
                <span>
                  <FormattedNumber
                    value={item.totalCurrency}
                    style="currency"
                    currency={item.price.currencyCode}
                  />
                </span>
                <button
                  className="ml-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  onClick={() => handleRemoveFromCartClicked(item.productId)}
                >
                  Remove from Cart
                </button>
              </div>
            </li>
          ))}
      </ul>
      <button
        onClick={handleCheckout}
        disabled={!cart || !cart.items || cart.items.length <= 0}
        className="ml-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Checkout
      </button>
    </>
  );
};
