import React, { useMemo } from "react";
import { Carousel, Image } from "antd";
import { selectedProductAtom } from "../../storageAtoms";
import { useAtomValue } from "jotai";
import { useFullImages, useProductImages } from "../../imageLoaders"; // ← added useProductImages

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

  // Instant backdrop: w500 grid image is already cached from the grid page, so
  // it paints on first render with no round-trip. The w1200 fades in on top.
  const backdropSrcs = useProductImages(imagesToDisplay); // ←
  const getBackdrop = (name?: string) =>
    (name && backdropSrcs[name]) || undefined; // ←

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
          const backdrop = getBackdrop(p);
          return (
            <div key={index} className="bg-zinc-100 grid!">
              {/* Reserve height so the region never collapses while resolving */}
              <div
                className="relative mx-auto [&_.ant-image]:absolute! [&_.ant-image]:inset-0! [&_.ant-image]:h-full! [&_.ant-image]:w-full! [&_.ant-image-img]:block! [&_.ant-image-img]:h-full! [&_.ant-image-img]:w-full! [&_.ant-image-img]:object-contain!"
                style={{ width: "100%", maxWidth: 700, aspectRatio: "3 / 4" }}
              >
                {backdrop && (
                  <img
                    src={backdrop.src}
                    srcSet={backdrop.srcset}
                    sizes="100vw"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "contain" }}
                    decoding="async"
                  />
                )}
                {src && (
                  <Image
                    src={src}
                    alt={`product-${index}`}
                    loading="lazy"
                    decoding="async"
                    className="transition-opacity duration-200 ease-out"
                  />
                )}
              </div>
            </div>
          );
        })}
      </Carousel>
    </Image.PreviewGroup>
  );
};

export default ProductImagesMobile;
