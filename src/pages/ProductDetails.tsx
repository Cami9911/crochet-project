import { Button, Col, CollapseProps, Image, RadioChangeEvent, Row } from "antd";
import { Collapse } from "antd";
import purseflorina5 from "../assets/purse-florina-5.jpg";
import purseflorina2 from "../assets/purse-florina-2.jpg";
import { useState } from "react";
import ImageRadioGroup from "../components/ImageRadioGroup";
import "./ProductDetails.scss";
import { PlusOutlined } from "@ant-design/icons";

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

const ProductDetails: React.FC = () => {
  const [value, setValue] = useState(1);

  const changeImage = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Row>
      <Col span={15}>
        <Row>
          <Col span={12}>
            <Image src={purseflorina5} alt="none" />
          </Col>
          <Col span={12}>
            <Image src={purseflorina2} alt="img" />
          </Col>
        </Row>
      </Col>
      <Col span={8} offset={1}>
        <div className="flex justify-center h-full">
          <div className="flex flex-col w-full">
            <span>SHOULDER BAG</span>
            <ImageRadioGroup value={value} onChange={changeImage} />
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
