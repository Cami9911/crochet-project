import { Button, Col, CollapseProps, Space } from "antd";
import { Collapse } from "antd";
import ColorSelectionWeb from "./ColorSelectionWeb";
import "./ProductDetails.scss";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { products } from "../../productData";

import { useParams } from "react-router-dom";
import { useState } from "react";
import ColorSelectionMobile from "./ColorSelectionMobile";
import { selectedColorAtom } from "../../storageAtoms";
import { useAtomValue } from "jotai";

const ProductInfo: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>([""]);

  const selectedColor = useAtomValue(selectedColorAtom);

  const { id } = useParams();
  const product = products.find((p) => p.key === id);

  const items: CollapseProps["items"] = [
    {
      key: "description",
      label: (
        <span className={activeKey === "description" ? "font-semibold" : ""}>
          DESCRIERE
        </span>
      ),
      children: (
        <Space orientation="vertical" size={"middle"}>
          <span>{product?.description?.generalDescription}</span>
          <div className="grid">
            <span className="font-semibold">Culoare:</span>
            <span>{product?.color}</span>
          </div>
          <div className="grid">
            <span className="font-semibold">Marime:</span>
            <span>Lungime: {product?.description?.length}</span>
            <span>Latime: {product?.description?.width}</span>
            <span>Inaltime: {product?.description?.height}</span>
          </div>
          <div className="grid">
            <span className="font-semibold">Accesorii:</span>
            <span>{product?.description?.accesorii}</span>
          </div>
        </Space>
      ),
    },
    {
      key: "materials",
      label: (
        <span className={activeKey === "materials" ? "font-semibold" : ""}>
          MATERIALE
        </span>
      ),
      children: <p>{product?.materials}</p>,
    },
  ];

  return (
    <Col
      span={24}
      md={{ span: 8, offset: 1 }}
      className="px-4 sm:px-2 md:px-0 md:pr-12 xl:px-0 xl:pr-40"
    >
      <div className="flex justify-center h-full">
        <div className="flex flex-col w-full">
          <span>SHOULDER BAG</span>

          <div className="hidden md:block mt-12">
            <span>CULOARE: {selectedColor}</span>
            <ColorSelectionWeb />
          </div>

          <div className="block md:hidden">
            <ColorSelectionMobile />
          </div>

          <Button
            size="large"
            className="mt-12 mb-4"
            color="default"
            variant="solid"
          >
            Comanda acum
          </Button>

          <span className="mt-4">Disponibilitate: produs in stoc</span>

          <Collapse
            accordion
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key[0])}
            ghost
            items={items}
            className="collapse-info p-0 mt-10!"
            expandIconPlacement="end"
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined style={{ fontSize: "20px" }} />
              ) : (
                <PlusOutlined style={{ fontSize: "20px" }} />
              )
            }
          />
        </div>
      </div>
    </Col>
  );
};

export default ProductInfo;
