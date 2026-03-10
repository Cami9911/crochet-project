import { Button, Col, CollapseProps, Image, Row } from "antd";
import { Collapse } from "antd";
import ImageRadioGroup from "../components/ImageRadioGroup";
import "./ProductDetails.scss";
import { PlusOutlined } from "@ant-design/icons";
import { products } from "../components/productData";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { productType } from "../components/types";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "DESCRIERE",
    children: <span>{text}</span>,
  },
  {
    key: "2",
    label: "MATERIALE",
    children: <p>{text}</p>,
  },
];

const images = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../assets/${imageName}`];

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.key === id);

  const [selectedProduct, setSelectedProduct] = useState<
    productType | undefined
  >(product);

  return (
    <Row>
      <Col span={15}>
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
            <Col span={12} lg={{ span: 8 }}>
              <Image src={getImage(p)} alt="none" />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={8} offset={1}>
        <div className="flex justify-center h-full">
          <div className="flex flex-col w-full">
            <span>SHOULDER BAG</span>
            {selectedProduct && (
              <ImageRadioGroup
                defaultProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            )}
            <Button
              size="large"
              className="my-4"
              color="default"
              variant="solid"
            >
              Comanda acum
            </Button>
            <span>Disponibilitate: produs in stoc</span>
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              items={items}
              className="collapse-info p-0"
              expandIconPlacement="end"
              expandIcon={() => <PlusOutlined style={{ fontSize: "20px" }} />}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetails;
