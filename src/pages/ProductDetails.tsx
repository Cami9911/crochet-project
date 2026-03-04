import { Button, Col, CollapseProps, Image, Row } from "antd";
import { Collapse } from "antd";
import purseflorina1 from "../assets/purse-florina-1.jpg";
import purseflorina2 from "../assets/purse-florina-2.jpg";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Descriere",
    children: <span>{text}</span>,
  },
  {
    key: "2",
    label: "Materiale",
    children: <p>{text}</p>,
  },
];

const ProductDetails: React.FC = () => {
  return (
    <Row>
      <Col span={12}>
        <Row>
          <Col span={12}>
            <Image src={purseflorina1} alt="none" />
          </Col>
          <Col span={12}>
            <Image src={purseflorina2} alt="img" />
          </Col>
        </Row>
      </Col>
      <Col span={11} offset={1}>
        <div className="flex justify-center h-full">
          <div className="flex flex-col w-full">
            <span>SHOULDER BAG</span>
            <div className="my-12">
              <span>CULOARE: Negru</span>
            </div>
            <Button className="my-4">Comanda acum</Button>
            <span>Disponibilitate: produs in stoc</span>
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              items={items}
              className="p-0"
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetails;
