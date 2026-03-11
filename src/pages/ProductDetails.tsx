import { Button, Col, CollapseProps, Image, Row, Space } from "antd";
import { Collapse } from "antd";
import ImageRadioGroup from "../components/ImageRadioGroup";
import "./ProductDetails.scss";
import { PlusOutlined } from "@ant-design/icons";
import { products } from "../components/productData";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { productType } from "../components/types";

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

  const items: CollapseProps["items"] = [
    {
      key: "description",
      label: <span className="font-semibold">DESCRIERE</span>,
      children: (
        <Space orientation="vertical" size={"middle"}>
          <span>{product?.description.generalDescription}</span>
          <div className="grid">
            <span className="font-semibold">Culoare:</span>
            <span>{product?.color}</span>
          </div>
          <div className="grid">
            <span className="font-semibold">Marime:</span>
            <span>Lungime: {product?.description.length}</span>
            <span>Latime: {product?.description.width}</span>
            <span>Inaltime: {product?.description.height}</span>
          </div>
          <div className="grid">
            <span className="font-semibold">Accesorii:</span>
            <span>{product?.description.accesorii}</span>
          </div>
        </Space>
      ),
    },
    {
      key: "2",
      label: <span className="font-semibold">MATERIALE</span>,
      children: <p>{product?.materials}</p>,
    },
  ];

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
            <span className="mt-4">Disponibilitate: produs in stoc</span>
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              items={items}
              className="collapse-info p-0 mt-10!"
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
