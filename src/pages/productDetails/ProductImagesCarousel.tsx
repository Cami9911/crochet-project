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

  return (
    <Carousel afterChange={onChange} className="max-w-154">
      {selectedProduct?.images.map((p: string, index: number) => {
        const src = getImage(p);
        return (
          <div key={index}>
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
