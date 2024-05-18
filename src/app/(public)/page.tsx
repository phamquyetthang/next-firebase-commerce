import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.from({ length: 30 }).map((_, i) => (
            <div className="group relative" key={i}>
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="Front of men's Basic Tee in black."
                  width={224}
                  height={320}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      Basic Tee
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Black</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
              </div>
            </div>
          ))}

          {/* More products... */}
        </div>
      </div>
    </div>
  );
};

export default Page;
