import { Radio, RadioChangeEvent } from "antd";
import "./ColorSelection.scss";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../productData";
import { useState } from "react";
import {
  blurImageAtom,
  selectedColorAtom,
  selectedProductAtom,
  urlHoverImageAtom,
} from "../../storageAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { CheckOutlined } from "@ant-design/icons";

const MAX_VISIBLE = 5;

type ColorSelectionProps = {
  hoverProductKey?: string;
};

const ColorSelectionWeb: React.FC<ColorSelectionProps> = ({
  hoverProductKey,
}) => {
  const navigate = useNavigate();

  const [selectionHoveredKey, setSelectionHoveredKey] = useState<string>("");

  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const selectedProduct = useAtomValue(selectedProductAtom);

  const setSelectedColor = useSetAtom(selectedColorAtom);

  const setUrlHoverImageAtom = useSetAtom(urlHoverImageAtom);
  const setBlurImageAtom = useSetAtom(blurImageAtom);

  const hoveredGridProduct = products.find((p) => p.key === hoverProductKey);

  const defaultProduct = hoverProductKey ? hoveredGridProduct : selectedProduct;

  const { id } = useParams();
  const [showAll, setShowAll] = useState(false);

  const uniqueID = hoverProductKey
    ? hoveredGridProduct?.key.split("F00")[0]
    : id?.split("F00")[0];
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
    const newSelectedProduct =
      products.find((item) => item.key === e.target.value) ?? null;
    setSelectedProduct(newSelectedProduct);
    navigate(`/product-details/${e.target.value}`);
  };

  return (
    <div className=" flex flex-col">
      <Radio.Group
        value={defaultProduct?.key}
        onChange={changeImage}
        className="image-radio-group"
      >
        <div
          className="flex flex-wrap gap-2"
          onMouseLeave={() => {
            setSelectedColor(defaultProduct?.color);
            setUrlHoverImageAtom("");
            setSelectionHoveredKey("");
            setBlurImageAtom(false);
          }}
        >
          {displayedProducts.map((item) => (
            <Radio key={item.key} value={item.key}>
              <div
                className={hoverProductKey ? "w-10 relative" : "w-20 relative"}
                style={{
                  border:
                    defaultProduct?.key === item.key
                      ? "1px solid #000"
                      : "1px solid #979797",
                  filter:
                    selectionHoveredKey === item.key
                      ? "brightness(0.8)"
                      : "brightness(1)",
                  transition: "filter 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={() => {
                  setSelectedColor(item.color);
                  setUrlHoverImageAtom(item.firstImage);
                  setSelectionHoveredKey(item.key);
                  setBlurImageAtom(defaultProduct?.key !== item.key);
                }}
              >
                <img
                  src={getImage(item.firstImage)}
                  alt={item.category}
                  style={{ width: "100%", height: "auto" }}
                />
                {defaultProduct?.key === item.key && (
                  <div className="absolute bottom-0 right-0 bg-[#2424245e] flex justify-center h-5 w-5 text-white">
                    <CheckOutlined />
                  </div>
                )}
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

export default ColorSelectionWeb;
