import { Button, Col, Image, Row } from "antd";
import "./ProductDetails.scss";
import {
  blurImageAtom,
  selectedProductAtom,
  urlHoverImageAtom,
} from "../../storageAtoms";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

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
            <Image
              src={
                urlHoverImage
                  ? getImage(urlHoverImage)
                  : selectedProduct
                    ? getImage(selectedProduct.firstImage)
                    : ""
              }
              alt="none"
              style={{
                height: "70vh",
                width: "auto",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            <Image
              src={
                selectedProduct?.secondImage
                  ? getImage(selectedProduct.secondImage)
                  : ""
              }
              alt="img"
              style={{
                height: "70vh",
                width: "auto",
                objectFit: "cover",
                opacity: blurImage ? 0.5 : 1,
              }}
            />
          </Col>
        </Row>
        <Row gutter={3}>
          {displayedProducts?.map((p: string) => (
            <Col span={12} lg={{ span: 8 }} key={p}>
              <Image
                src={getImage(p)}
                alt="none"
                style={{
                  opacity: blurImage ? 0.5 : 1,
                }}
              />
            </Col>
          ))}
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
