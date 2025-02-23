import { ICartDataRes } from "@/features/cart/type";
import { ICreateProductInput } from "@/features/products/type";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51KgA7ZFd02bDX8hJ3A2a85UpdJwK4dBBjxECopK7Cp46NSSbVjqMp5ttYxRJzgPoR5oQUvbIIBLnrOBcwgZRCnIJ00RW0jHHOy"
);
export default stripe;

export const createProductStripe = async (data: ICreateProductInput) => {
  try {
    const product = await stripe.products.create({
      name: data.name,
      description: data.description, // html
      images: data.images,
    });

    // create price
    if (product.id) {
      data.stripeId = product.id;
      if (data.properties.length) {
        for (let i = 0; i < data.properties.length; i++) {
          const property = data.properties[i];
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: property.price * 100,
            currency: "usd",
            metadata: {
              color: String(property.color),
              size: String(property.size),
            },
          });
          if (price.id) {
            data.properties[i].stripeId = price.id;
          }
        }
      }
    }

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: stripe.ts:40 ~ createProductStripe ~ error:",
      error
    );
    return data;
  }
};




export const createPaymentLink = async (cartData: ICartDataRes) => {
  try {
    const lineItems = cartData.products
      .map((p) => ({ ...p, property: JSON.parse(p.property || "{}") }))
      .filter((p) => !!p.data && p.property["stripeId"])
      .reduce((pre = [], cur) => {
        if (!pre || pre.length === 0) {
          pre.push(cur)
          return pre
        }

        if (pre.some(p => p.property["stripeId"] === cur.property["stripeId"])) {
          return pre.map(p => {
            if (p.property["stripeId"] === cur.property["stripeId"]) {
              return {
                ...p,
                quantity: p.quantity + cur.quantity
              }
            }
            return p
          })
        } else {
          pre.push(cur)
        }

        return pre
      }, [] as Array<{ quantity: number; property: { stripeId: string }; itemId: number }>);
    
    const paymentLink = await stripe.paymentLinks.create({
      line_items: lineItems.map(i => ({
        price: i.property["stripeId"],
        quantity: i.quantity,
      })),
      metadata: {
        cartId: cartData.id,
      }
    });


    return paymentLink
  } catch (error) {
    console.error("🚀 ~ createPaymentLink ~ error:", error);
  }
};
