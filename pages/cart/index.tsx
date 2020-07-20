import { useContext } from "react";
import { FormattedNumber } from "react-intl";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import { WebsiteContext } from "../../store/WebsiteContext";
import { checkoutCart } from "../../lib/SimpleStore";
import { firstImage } from "../../lib/Util";

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

    console.error("stripe error: ", error);
    console.log("Session Id", sessionId);
  };

  return (
    <>
      <h1 className="px-1 text-2xl text-gray-600">View Cart</h1>
      <ul>
        {cart &&
          cart.items &&
          cart.items.map((item) => {
            const image = firstImage(item.files);
            return (
              <>
                <li
                  key={item.productId}
                  className="ml-4 mt-4 px-4 py-3 bg-gray-200 relative w-60"
                >
                  <div className="flex">
                    {image && (
                      <img
                        className="mt-3 rounded-lg shadow-xl max-w-xs h-20 object-cover object-center"
                        src={`${image.edgeUrl}/fit-in/400x400/${image.accessUrl}`}
                      />
                    )}
                    <div className="ml-2 px-3 py-2">
                      <span className="font-bold">{item.title}</span>
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
                        className="ml-20 mr-4 mb-8 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded absolute right-0 "
                        onClick={() =>
                          handleRemoveFromCartClicked(item.productId)
                        }
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </li>
                <br />
              </>
            );
          })}
      </ul>
      <button
        onClick={handleCheckout}
        disabled={!cart || !cart.items || cart.items.length <= 0}
        className="mt-2 ml-4 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Checkout
      </button>
    </>
  );
};
