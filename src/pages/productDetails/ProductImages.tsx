import { Col, Image, Row } from "antd";
import "./ProductDetails.scss";

import { ProductImagesProps } from "../../types";

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

const ProductImages: React.FC<ProductImagesProps> = ({ selectedProduct }) => {
  return (
    <Col span={24} md={{ span: 15 }} xs={0}>
      <Row gutter={3}>
        <Col span={24} lg={{ span: 12 }}>
          <Image
            src={
              selectedProduct?.firstImage
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
    </Col>
  );
};

export default ProductImages;
