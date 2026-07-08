import { Radio, RadioChangeEvent } from "antd";
import "./ColorSelection.scss";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../productData";
import { useEffect, useState } from "react";
import {
  blurImageAtom,
  selectedColorAtom,
  selectedProductAtom,
  urlHoverImageAtom,
} from "../../storageAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { CheckOutlined } from "@ant-design/icons";
import { useSwatchUrl } from "../../SwatchCache";

const MAX_VISIBLE = 5;

type ColorSelectionProps = {
  hoverProductKey?: string;
};

// Reads the swatch URL from the prewarm cache. When GridContent has already
// warmed this page's swatches (the normal case), the URL is present on the
// first render and the image paints instantly — no fetch, no pop-in. The box
// around it already reserves space via aspect-3/4, so nothing shifts.
const SwatchImg: React.FC<{ name: string; alt: string }> = ({ name, alt }) => {
  const src = useSwatchUrl(name);
  if (!src) return null;
  return <img src={src} alt={alt} className="w-full h-full object-contain" />;
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

  useEffect(() => {
    if (!id) return;
    const product = products.find((p) => p.key === id);

    if (product) {
      setSelectedProduct(product);
      setSelectedColor(product.color);
    }
  }, [id, setSelectedProduct, setSelectedColor]);

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
                className={
                  hoverProductKey
                    ? "w-10 aspect-3/4 relative"
                    : "w-20 aspect-3/4 relative"
                }
                style={{
                  filter:
                    selectionHoveredKey === item.key
                      ? "brightness(0.8)"
                      : "brightness(1)",
                  transition: "filter 0.2s ease",
                }}
                onMouseEnter={() => {
                  setSelectedColor(item.color);
                  setUrlHoverImageAtom(item.firstImage);
                  setSelectionHoveredKey(item.key);
                  setBlurImageAtom(defaultProduct?.key !== item.key);
                }}
              >
                <SwatchImg name={item.firstImage} alt={item.category} />
                {/* border overlay — sits on top of the image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border:
                      defaultProduct?.key === item.key
                        ? "1px solid #000"
                        : "1px solid #979797",
                    transition: "border-color 0.2s ease",
                  }}
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
              className={`${hoverProductKey ? "w-10 h-13.5" : "w-20 h-26.5"} border border-[#979797] flex items-center justify-center text-xl cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-200`}
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
