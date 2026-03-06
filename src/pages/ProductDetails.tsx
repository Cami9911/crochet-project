import { Button, Col, CollapseProps, Image, RadioChangeEvent, Row } from "antd";
import { Collapse } from "antd";
import { useState } from "react";
import ImageRadioGroup from "../components/ImageRadioGroup";
import "./ProductDetails.scss";
import { PlusOutlined } from "@ant-design/icons";

import test1 from "../assets/test1.jpg";
import test2 from "../assets/test2.jpg";
import test3 from "../assets/test3.jpg";
import test4 from "../assets/test4.jpg";
import test5 from "../assets/test5.jpg";
import test6 from "../assets/test6.jpg";
import test7 from "../assets/test7.jpg";
import test8 from "../assets/test8.jpg";

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
        <Row gutter={3}>
          <Col span={24} lg={{ span: 12 }}>
            <Image
              src={test1}
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
              src={test2}
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
          <Col span={12} lg={{ span: 8 }}>
            <Image src={test3} alt="none" />
          </Col>
          <Col span={12} lg={{ span: 8 }}>
            <Image src={test4} alt="img" />
          </Col>
          <Col span={12} lg={{ span: 8 }}>
            <Image src={test5} alt="img" />
          </Col>
        </Row>
        <Row gutter={3}>
          <Col span={12} lg={{ span: 8 }}>
            <Image src={test6} alt="none" />
          </Col>
          <Col span={12} lg={{ span: 8 }}>
            <Image src={test7} alt="img" />
          </Col>
          <Col span={12} lg={{ span: 8 }}>
            <Image src={test8} alt="img" />
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
