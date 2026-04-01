import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../productData";
import { productType } from "../../types";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedColorAtom, selectedProductAtom } from "../../storageAtoms";

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

const ColorSelectionMobile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const setSelectedProduct = useSetAtom(selectedProductAtom);

  const selectedColor = useAtomValue(selectedColorAtom);
  const setSelectedColor = useSetAtom(selectedColorAtom);

  const uniqueID = id?.split("F00")[0];
  const similarProducts = uniqueID
    ? products.filter((p) => p.key.split("F00")[0] === uniqueID)
    : [];

  const changeProduct = (product: productType) => {
    setSelectedProduct(product);
    setSelectedColor(product.color);
    navigate(`/product-details/${product.key}`);
  };

  return (
    <div className="max-h-48 my-16  ">
      <span>CULOARE: {selectedColor}</span>

      <div className="flex gap-2 overflow-x-auto">
        {similarProducts.map((product, index) => {
          const src = getImage(product.firstImage);

          return (
            <button
              key={index}
              type="button"
              onClick={() => changeProduct(product)}
              className="shrink-0 w-20 sm:w-24 md:w-28 lg:w-32"
            >
              <img src={src} alt={`product-${index}`} className="w-full " />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelectionMobile;
