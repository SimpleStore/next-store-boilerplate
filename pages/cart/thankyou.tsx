import { useRouter } from "next/router";
import { getSessionDetail } from "../../lib/SimpleStore";
import { useState, useEffect, useContext } from "react";
import { ICheckoutSession } from "../../lib/Interfaces";
import { WebsiteContext } from "../../store/WebsiteContext";

export default () => {
  const router = useRouter();
  const [order, setOrder] = useState<ICheckoutSession>();
  const { resetCartId } = useContext(WebsiteContext);

  const { session_id } = router.query;
  console.log(session_id);

  const getDetails = async () => {
    const session = await getSessionDetail(session_id);
    if (session) {
      setOrder(session);
      resetCartId();
    }
  };

  useEffect(() => {
    if (session_id) getDetails();
  }, [session_id]);

  if (!order || (order && !order.isBasketAvailable)) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Thank you</h1>
      <div>
        <span>Order Id: {order.orderId}</span>
        <span>Order Total: {order.orderTotalPaid}</span>
      </div>
    </>
  );
};
