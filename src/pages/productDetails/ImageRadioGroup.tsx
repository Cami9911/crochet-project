import { Radio, RadioChangeEvent } from "antd";
import "./ImageRadioGroup.scss";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../components/productData";
import { productType } from "../../types";
import { useState } from "react";
import { selectedProductAtom, urlHoverImageAtom } from "../../storageAtoms";
import { useSetAtom } from "jotai";

interface ImageRadioGroupProps {
  defaultProduct: productType;
}

const MAX_VISIBLE = 5;

const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({
  defaultProduct,
}) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [defaultColor, setDefaultColor] = useState(defaultProduct.color);

  const setUrlHoverImageAtom = useSetAtom(urlHoverImageAtom);

  const setSelectedProduct = useSetAtom(selectedProductAtom);

  const uniqueID = id?.split("F00")[0];
  const similarProducts = uniqueID
    ? products.filter((p) => p.key.split("F00")[0] === uniqueID)
    : [];

  const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const getImage = (imageName: string) => images[`../../assets/${imageName}`];

  const hiddenCount =
    similarProducts.length > MAX_VISIBLE
      ? similarProducts.length - MAX_VISIBLE
      : 0;

  const displayedProducts = showAll
    ? similarProducts
    : similarProducts.slice(0, MAX_VISIBLE);

  const changeImage = (e: RadioChangeEvent) => {
    console.log(e.target.value);

    const selectedProduct =
      products.find((item) => item.key === e.target.value) ?? null;
    setSelectedProduct(selectedProduct);
    navigate(`/product-details/${e.target.value}`);
  };

  return (
    <div className="my-12 flex flex-col">
      <span>CULOARE: {defaultColor}</span>
      <Radio.Group
        value={defaultProduct.key}
        onChange={changeImage}
        className="image-radio-group"
      >
        <div className="flex flex-wrap gap-2">
          {displayedProducts.map((item) => (
            <Radio key={item.key} value={item.key}>
              <div
                className="w-20"
                style={{
                  border:
                    defaultProduct.key === item.key
                      ? "1px solid #000"
                      : "1px solid #979797",
                }}
                onMouseEnter={() => {
                  setDefaultColor(item.color);
                  setUrlHoverImageAtom(item.firstImage);
                }}
                onMouseLeave={() => {
                  setDefaultColor(defaultProduct.color);
                  setUrlHoverImageAtom("");
                }}
              >
                <img
                  src={getImage(item.firstImage)}
                  alt={item.category}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Radio>
          ))}

          {!showAll && hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="w-20 h-26.5 border border-[#979797] flex items-center justify-center text-xl cursor-pointer bg-white"
            >
              +{hiddenCount}
            </button>
          )}
        </div>
      </Radio.Group>
    </div>
  );
};

export default ImageRadioGroup;
