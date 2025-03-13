"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useChangeQuery from "@/utils/hooks/useChangeQuery";
import { ICartDataRes } from "@/features/cart/type";
import { createPaymentLinkAction, removeItemFromMyCartAction } from "./action";
import clsx from "clsx";

export default function CartSlider({ uuid, ...cartData }: ICartDataRes & { uuid?: string }) {
  const { products, } = cartData;
  const [loading, setLoading] = useState(false);
  const { onChangeQuery, getQuery } = useChangeQuery();
  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    onChangeQuery("cartOpen", String(isOpen));
    setOpen(isOpen);
  };

  useEffect(() => {
    setOpen(getQuery("cartOpen") === "true");
  }, [getQuery]);

  const onRemoveItem = async (itemId: number) => {
    setLoading(true);
    if (uuid) {
   await  removeItemFromMyCartAction(uuid, itemId)
      
    }
    setLoading(false)
  }


  const goToCheckout = async () => {
    setLoading(true);
    const paymentLink = await createPaymentLinkAction(cartData, location.href);
    const url = paymentLink?.url;
    console.log("🚀 ~ goToCheckout ~ url:", url)
    if(url){
      location.href = url;
    }
    setLoading(false)
  }

  return (
    <Fragment>
      <Button onClick={() => onOpenChange(true)}>
        <ShoppingCart />
        Cart
      </Button>
      <Dialog
        open={open}
        onClose={(isOpen) => onOpenChange(isOpen)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-100 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-100 ease-in-out data-[closed]:translate-x-full sm:duration-300"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => onOpenChange(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <X aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {products.map((product) => (
                            <li key={product.data?.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.data?.images?.[0] || ""}
                                  alt={product.data?.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col w-full overflow-hidden">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.data?.name}</h3>
                                    <p className="ml-4">
                                      {product.data?.defaultPrice}
                                    </p>
                                  </div>
                                  <div className="mt-1 text-sm text-gray-500 whitespace-break-spaces flex gap-1">
                                    <span>
                                      {JSON.parse(product.property || '{}')['size']}
                                    </span>
                                    <span>
                                      {JSON.parse(product.property || '{}')['color']}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {product.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      disabled={loading}
                                      className={clsx("font-medium text-indigo-600 hover:text-indigo-500",{ "opacity-50": loading})}
                                      onClick={() => product.data?.id && onRemoveItem(product.itemId)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$262.00</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={goToCheckout}
                        disabled={loading}
                        className={clsx("w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700", { "opacity-50 cursor-progress": loading })}
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => onOpenChange(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}
