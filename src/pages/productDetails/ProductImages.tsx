import { Col, Image, Row } from "antd";
import "./ProductDetails.scss";
import { selectedProductAtom, urlHoverImageAtom } from "../../storageAtoms";
import { useAtomValue } from "jotai";

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

const ProductImages: React.FC = () => {
  const urlHoverImage = useAtomValue(urlHoverImageAtom);
  const selectedProduct = useAtomValue(selectedProductAtom);

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
              }}
            />
          </Col>
        </Row>
        <Row gutter={3}>
          {selectedProduct?.images.map((p: string) => (
            <Col span={12} lg={{ span: 8 }} key={p}>
              <Image src={getImage(p)} alt="none" />
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
    </Col>
  );
};

export default ProductImages;
