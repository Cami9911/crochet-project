import React from "react";
import { Carousel } from "antd";
import { ProductImagesProps } from "../../types";

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

const ProductImagesCarousel: React.FC<ProductImagesProps> = ({
  selectedProduct,
}) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const imagesToDisplay = [
    selectedProduct?.firstImage,
    selectedProduct?.secondImage,
    ...(selectedProduct?.images ?? []),
  ].filter((img): img is string => Boolean(img));

  return (
    <Carousel afterChange={onChange} className="mb-2">
      {imagesToDisplay.map((p: string, index: number) => {
        const src = getImage(p);
        return (
          <div key={index} className="bg-zinc-100">
            <img
              src={src}
              alt={`product-${index}`}
              style={{
                width: "500px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ProductImagesCarousel;
