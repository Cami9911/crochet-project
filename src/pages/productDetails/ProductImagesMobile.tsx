import React, { useMemo } from "react";
import { Carousel, Image } from "antd";
import { selectedProductAtom } from "../../storageAtoms";
import { useAtomValue } from "jotai";
import { useFullImages } from "../../imageLoaders";

const ProductImagesMobile: React.FC = () => {
  const selectedProduct = useAtomValue(selectedProductAtom);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const imagesToDisplay = useMemo(
    () =>
      [
        selectedProduct?.firstImage,
        selectedProduct?.secondImage,
        ...(selectedProduct?.images ?? []),
      ].filter((img): img is string => Boolean(img)),
    [selectedProduct],
  );

  const srcs = useFullImages(imagesToDisplay);
  const getImage = (name?: string) => (name && srcs[name]) || "";

  return (
    <Image.PreviewGroup
      preview={{
        onChange: (current, prev) =>
          console.log(`current index: ${current}, prev index: ${prev}`),
      }}
    >
      <Carousel afterChange={onChange} className="mb-2">
        {imagesToDisplay.map((p: string, index: number) => {
          const src = getImage(p);
          return (
            <div key={index} className="bg-zinc-100 grid!">
              {src && (
                <Image
                  src={src}
                  alt={`product-${index}`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "700px",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </div>
          );
        })}
      </Carousel>
    </Image.PreviewGroup>
  );
};

export default ProductImagesMobile;
