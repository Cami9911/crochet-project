import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../productData";
import { productType } from "../../types";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedColorAtom, selectedProductAtom } from "../../storageAtoms";
import { capitalizeFirst } from "../../useFunctions";
import { ro } from "../../translations";
import { useThumbnails } from "../../imageLoaders";

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

  // Resolve only the thumbnails for the color variants actually shown.
  const thumbs = useThumbnails(similarProducts.map((p) => p.firstImage));

  const changeProduct = (product: productType) => {
    setSelectedProduct(product);
    setSelectedColor(product.color);
    navigate(`/product-details/${product.key}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!id) return;
    const product = products.find((p) => p.key === id);

    if (product) {
      setSelectedProduct(product);
      setSelectedColor(product.color);
    }
  }, [id, setSelectedProduct, setSelectedColor]);

  return (
    <div className="max-h-48 my-8  ">
      <span>
        CULOARE:{" "}
        {selectedColor ? capitalizeFirst(ro.colors[selectedColor]) : ""}
      </span>

      <div className="flex gap-2 overflow-x-auto">
        {similarProducts.map((product, index) => {
          const src = thumbs[product.firstImage] ?? "";

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
