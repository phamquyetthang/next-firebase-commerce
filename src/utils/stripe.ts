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
