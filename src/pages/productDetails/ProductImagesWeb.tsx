import { Button, Col, Image, Row } from "antd";
import "./ProductDetails.scss";
import {
  blurImageAtom,
  selectedProductAtom,
  urlHoverImageAtom,
} from "../../storageAtoms";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useLargeImages, useDetailThumbs } from "../../imageLoaders";

const MAX_VISIBLE = 3;

const ProductImagesWeb: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const urlHoverImage = useAtomValue(urlHoverImageAtom);
  const blurImage = useAtomValue(blurImageAtom);

  const selectedProduct = useAtomValue(selectedProductAtom);

  const imagesLength = selectedProduct?.images?.length ?? 0;

  const hiddenCount =
    imagesLength > MAX_VISIBLE ? imagesLength - MAX_VISIBLE : 0;

  const displayedProducts = showAll
    ? selectedProduct?.images
    : selectedProduct?.images.slice(0, MAX_VISIBLE);

  useEffect(() => {
    setShowAll(false);
  }, [selectedProduct]);

  // Large images we may need: the two main shots + whatever is being hovered
  // from the color selector. Resolved lazily; the merge in useSingleSrc keeps
  // earlier ones around so hovering doesn't blank the main image.
  const largeNeeded = useMemo(() => {
    const out: string[] = [];
    if (selectedProduct?.firstImage) out.push(selectedProduct.firstImage);
    if (selectedProduct?.secondImage) out.push(selectedProduct.secondImage);
    if (urlHoverImage) out.push(urlHoverImage);
    return out;
  }, [selectedProduct, urlHoverImage]);

  const largeSrcs = useLargeImages(largeNeeded);

  // Resolve thumbs for the whole gallery so "show more" doesn't refetch.
  const thumbNeeded = useMemo(
    () => selectedProduct?.images ?? [],
    [selectedProduct],
  );
  const thumbSrcs = useDetailThumbs(thumbNeeded);

  const getLarge = (name?: string) => (name && largeSrcs[name]) || "";
  const getThumb = (name?: string) => (name && thumbSrcs[name]) || "";

  // Main image: prefer the hovered variant; fall back to the product's first
  // image while the hovered one is still resolving (no blank flash).
  const mainSrc = urlHoverImage
    ? getLarge(urlHoverImage) || getLarge(selectedProduct?.firstImage)
    : getLarge(selectedProduct?.firstImage);

  const secondSrc = getLarge(selectedProduct?.secondImage);

  return (
    <Col
      span={24}
      md={{ span: 15 }}
      xs={0}
      className="px-4 sm:px-0 sm:pl-2 md:px-0 md:pl-12 xl:px-0 xl:pl-40"
    >
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        <Row gutter={3}>
          <Col span={24} lg={{ span: 12 }}>
            {mainSrc && (
              <Image
                src={mainSrc}
                alt="none"
                style={{
                  height: "80vh",
                  width: "auto",
                  objectFit: "cover",
                }}
              />
            )}
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            {secondSrc && (
              <Image
                src={secondSrc}
                alt="img"
                style={{
                  height: "80vh",
                  width: "auto",
                  objectFit: "cover",
                  opacity: blurImage ? 0.5 : 1,
                }}
              />
            )}
          </Col>
        </Row>
        <Row gutter={3}>
          {displayedProducts?.map((p: string) => {
            const thumb = getThumb(p);
            return (
              <Col span={12} lg={{ span: 8 }} key={p}>
                {thumb && (
                  <Image
                    src={thumb}
                    alt="none"
                    style={{
                      opacity: blurImage ? 0.5 : 1,
                    }}
                  />
                )}
              </Col>
            );
          })}
          {!showAll && hiddenCount > 0 && (
            <Col span={24}>
              <div className="flex justify-center h-full">
                <Button
                  size="large"
                  className="my-4 w-100"
                  onClick={() => setShowAll(true)}
                >
                  Afiseaza mai multe imagini
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Image.PreviewGroup>
    </Col>
  );
};

export default ProductImagesWeb;
