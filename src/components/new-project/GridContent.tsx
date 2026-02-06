import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "../AllProductsData";
import ControlFilters from "../filters/ControlFilters";

const GridContent: React.FC = () => {
  return (
    <Content className="relative">
      <ControlFilters />

      <Row gutter={16}>
        {allProducts?.map(({ key, label, src }) => {
          return (
            <Col className="gutter-row" span={12} lg={{ span: 6 }} key={key}>
              <Image alt="example" className="" src={src} />
              <div>{label}</div>
            </Col>
          );
        })}
      </Row>
    </Content>
  );
};
export default GridContent;
