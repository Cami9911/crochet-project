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

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

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
          const src = isHovered
            ? getImage(product.secondImage)
            : getImage(product.firstImage);

          return (
            <div
              key={index}
              onClick={() => loadProduct(product)}
              onMouseEnter={() => setHoveredProductKey(product.key)}
              onMouseLeave={() => setHoveredProductKey(null)}
            >
              <img
                src={src}
                alt={`product-${index}`}
                className="w-full h-auto px-1 cursor-pointer"
              />
              <p className="mt-2 font-semibold">Geanta {product.style}</p>
              <p className="mt-2 ">
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
