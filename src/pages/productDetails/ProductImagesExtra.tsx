import React, { useState } from "react";
import { Carousel, Col, Grid } from "antd";
import { productType } from "../../types";
import { useNavigate } from "react-router-dom";
import { products } from "../../productData";
import { selectedProductAtom } from "../../storageAtoms";
import { useSetAtom } from "jotai";
import { ro } from "../../translations";

type SimilarProductsProps = {
  similarProducts: productType[];
  title: string;
};

const { useBreakpoint } = Grid;

type Img = { src: string; srcset: string };

const srcsets = import.meta.glob<string>("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
  query: { w: "300;500;800;1200", format: "webp", as: "srcset" },
});

const fallbacks = import.meta.glob<string>(
  "../../assets/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
    query: { w: "500", format: "webp" },
  },
);

const assetMap: Record<string, Img> = {};
for (const [path, srcset] of Object.entries(srcsets)) {
  const name = path.split("/").pop()!;
  assetMap[name] = { src: fallbacks[path], srcset };
}

const EMPTY: Img = { src: "", srcset: "" };
const getImg = (filename?: string): Img =>
  (filename && assetMap[filename]) || EMPTY;

const ProductImagesExtra: React.FC<SimilarProductsProps> = ({
  similarProducts,
  title,
}) => {
  const navigate = useNavigate();

  const [hoveredProductKey, setHoveredProductKey] = useState<string | null>(
    null,
  );

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const setSelectedProduct = useSetAtom(selectedProductAtom);

  const loadProduct = (product: productType) => {
    const productToSet =
      products.find((item) => item.key === product.key) ?? null;
    setSelectedProduct(productToSet);
    navigate(`/product-details/${product.key}`);
    window.scrollTo(0, 0);
  };

  const capitalizeFirst = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const screens = useBreakpoint();

  const slidesToShow = !screens.sm ? 2 : !screens.md ? 3 : !screens.xl ? 5 : 6;

  return (
    <Col span={24} className="mt-16 px-4 sm:px-0 sm:pl-2 md:px-12 xl:px-40">
      <p className="mb-6 text-xl font-semibold">{title}</p>
      <Carousel
        afterChange={onChange}
        className="mb-2 w-full"
        arrows
        dots={false}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToShow}
      >
        {similarProducts.map((product: productType, index: number) => {
          const isHovered = hoveredProductKey === product.key;
          const primary = getImg(product.firstImage);
          const hover = getImg(product.secondImage);
          const hasHover = !!(hover.src || hover.srcset);

          const SIZES =
            "(min-width: 1200px) 16vw, (min-width: 768px) 20vw, (min-width: 576px) 33vw, 50vw";

          return (
            <div
              key={index}
              onClick={() => loadProduct(product)}
              onMouseEnter={() => setHoveredProductKey(product.key)}
              onMouseLeave={() => setHoveredProductKey(null)}
            >
              <div className="px-1">
                <div className="relative">
                  <img
                    src={primary.src}
                    srcSet={primary.srcset}
                    sizes={SIZES}
                    alt={`product-${index}`}
                    className="block w-full h-auto cursor-pointer"
                    loading="lazy"
                    decoding="async"
                  />
                  {hasHover && (
                    <img
                      src={hover.src}
                      srcSet={hover.srcset}
                      sizes={SIZES}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-auto cursor-pointer transition-opacity duration-150 ease-out"
                      style={{ opacity: isHovered ? 1 : 0 }}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </div>
              <p className="mt-2 font-semibold px-2"> {product.name}</p>
              <p className="px-2">
                Culoare · {capitalizeFirst(ro.colors[product.color])}
              </p>
            </div>
          );
        })}
      </Carousel>
    </Col>
  );
};

export default ProductImagesExtra;
