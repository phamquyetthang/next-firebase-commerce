import { checkoutCompletedCart } from "@/features/cart/model";
import stripe from "@/utils/stripe";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const data = await request.json();
  // Handle the event
  switch (data.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = data;
      const paymentLinkId = checkoutSessionCompleted.data.object.payment_link;
      const paymentLink = await stripe.paymentLinks.retrieve(paymentLinkId);
      const metaData = paymentLink.metadata;
      const cartId = metaData.cartId;
      // Update the cart status to paid
      if (cartId) {
        await checkoutCompletedCart(cartId,checkoutSessionCompleted.data.object.payment_intent, paymentLinkId);
      }

      break;
    default:
      console.log(`Unhandled event type ${data.type}`);
  }
  return NextResponse.json({message: "Webhook received"});
};
