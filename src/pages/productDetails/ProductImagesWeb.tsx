import { Button, Col, Image, Row } from "antd";
import "./ProductDetails.scss";
import {
  blurImageAtom,
  selectedProductAtom,
  urlHoverImageAtom,
} from "../../storageAtoms";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import {
  useLargeImages,
  useDetailThumbs,
  useProductImages, // ← for the instant w500 backdrop
} from "../../imageLoaders";

const MAX_VISIBLE = 3;

const SIZES = "(min-width: 992px) 50vw, 100vw";

const ProductImagesWeb: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const urlHoverImage = useAtomValue(urlHoverImageAtom);
  const blurImage = useAtomValue(blurImageAtom);

  const selectedProduct = useAtomValue(selectedProductAtom);

  const imagesLength = selectedProduct?.images?.length ?? 0;

  const hiddenCount =
    imagesLength > MAX_VISIBLE ? imagesLength - MAX_VISIBLE : 0;

  const displayedProducts = useMemo(
    () =>
      showAll
        ? (selectedProduct?.images ?? [])
        : (selectedProduct?.images?.slice(0, MAX_VISIBLE) ?? []),
    [showAll, selectedProduct],
  );

  const largeNeeded = useMemo(() => {
    const out: string[] = [];
    if (selectedProduct?.firstImage) out.push(selectedProduct.firstImage);
    if (selectedProduct?.secondImage) out.push(selectedProduct.secondImage);
    if (urlHoverImage) out.push(urlHoverImage);
    return out;
  }, [selectedProduct, urlHoverImage]);

  const largeSrcs = useLargeImages(largeNeeded);

  // Instant backdrop: the w500 { src, srcset } is already cached from the grid
  // page for firstImage/secondImage, so it paints on the first render with no
  // round-trip. The w1400 fades in on top once it resolves.
  const backdropSrcs = useProductImages(largeNeeded); // ←

  const thumbSrcs = useDetailThumbs(displayedProducts);

  const getLarge = (name?: string) => (name && largeSrcs[name]) || "";
  const getThumb = (name?: string) => (name && thumbSrcs[name]) || "";
  const getBackdrop = (name?: string) =>
    (name && backdropSrcs[name]) || undefined; // ← { src, srcset } | undefined

  const mainName = urlHoverImage || selectedProduct?.firstImage;
  const mainLarge = urlHoverImage
    ? getLarge(urlHoverImage) || getLarge(selectedProduct?.firstImage)
    : getLarge(selectedProduct?.firstImage);
  const mainBackdrop = getBackdrop(mainName);

  const secondName = selectedProduct?.secondImage;
  const secondLarge = getLarge(secondName);
  const secondBackdrop = getBackdrop(secondName);

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
            <div className="relative bg-gray-100" style={{ height: "80vh" }}>
              {/* instant low-res backdrop (cached w500 from the grid) */}
              {mainBackdrop && (
                <img
                  src={mainBackdrop.src}
                  srcSet={mainBackdrop.srcset}
                  sizes={SIZES}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 m-auto"
                  style={{
                    height: "80vh",
                    width: "auto",
                    objectFit: "cover",
                  }}
                  decoding="async"
                />
              )}
              {/* sharp w1400, fades in on top when resolved */}
              {mainLarge && (
                <Image
                  src={mainLarge}
                  alt="none"
                  loading="eager"
                  {...{ fetchpriority: "high" }}
                  className="relative transition-opacity duration-200 ease-out"
                  style={{
                    height: "80vh",
                    width: "auto",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            <div className="relative bg-gray-100" style={{ height: "80vh" }}>
              {secondBackdrop && (
                <img
                  src={secondBackdrop.src}
                  srcSet={secondBackdrop.srcset}
                  sizes={SIZES}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 m-auto"
                  style={{
                    height: "80vh",
                    width: "auto",
                    objectFit: "cover",
                    opacity: blurImage ? 0.5 : 1,
                  }}
                  decoding="async"
                />
              )}
              {secondLarge && (
                <Image
                  src={secondLarge}
                  alt="img"
                  {...{ fetchpriority: "low" }}
                  className="relative transition-opacity duration-200 ease-out"
                  style={{
                    height: "80vh",
                    width: "auto",
                    objectFit: "cover",
                    opacity: blurImage ? 0.5 : 1,
                  }}
                />
              )}
            </div>
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
                    loading="lazy"
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
