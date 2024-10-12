"use client";
import { IProperties } from "@/features/products/type";
import { cn } from "@/lib/utils";
import { Radio, RadioGroup } from "@headlessui/react";
import { set, uniq } from "lodash";
import React, { useEffect, useState } from "react";

interface IProps {
  properties: IProperties[];
}
const AddToCartForm = ({ properties }: IProps) => {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();

  const [selectedProperty, setSelectedProperty] = useState<IProperties>();

  const colors = uniq(properties.map(({ color }) => color?.toLowerCase())); // red, Red => red

  const sizes = uniq(properties.map(({ size }) => size?.toUpperCase())); // s, S => S

  useEffect(() => {
    const initProperty = properties[0];
    if (initProperty) {
      setSelectedColor(initProperty.color || "");
      setSelectedSize(initProperty.size || "");
    }
  }, [properties]);

  useEffect(() => {
    const propertyMatchColor = properties.filter(
      (p) => p.color?.toLowerCase() === selectedColor
    );

    let property = propertyMatchColor.find(
      (p) => p.size?.toUpperCase() === selectedSize
    );

    if (!property) {
      property = propertyMatchColor[0];
      setSelectedSize(property?.size || "");
    }

    if (property) {
      setSelectedProperty(property);
    }
  }, [properties, selectedColor, selectedSize]);

  return (
    <form className="mt-10">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>

        <fieldset aria-label="Choose a color" className="mt-4">
          <RadioGroup
            value={selectedColor}
            onChange={setSelectedColor}
            className="flex items-center space-x-3"
          >
            {colors.map((color) => (
              <Radio
                key={color}
                value={color}
                aria-label={color}
                className={cn(
                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: color }}
                  className={cn(
                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                  )}
                />
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      </div>

      {/* Sizes */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Size guide
          </a>
        </div>

        <fieldset aria-label="Choose a size" className="mt-4">
          <RadioGroup
            value={selectedSize}
            onChange={setSelectedSize}
            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
          >
            {sizes.map((size) => (
              <Radio
                key={size}
                value={size}
                className={cn(
                  "cursor-pointer bg-white text-gray-900 shadow-sm",
                  "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                )}
              >
                <span>{size}</span>
                {size ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                    >
                      <line
                        x1={0}
                        x2={100}
                        y1={100}
                        y2={0}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                )}
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to bag
      </button>
    </form>
  );
};

export default AddToCartForm;
