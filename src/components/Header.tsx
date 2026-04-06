import { Row, Col } from "antd";
import HeaderAutoComplete from "./HeaderAutoComplete";

const Header: React.FC = () => {
  return (
    <Row
      // gutter={[16, 16]}
      align="middle"
      className="h-24 xs:h-16 md:h-16 md:mt-6 px-4 sm:px-2 md:px-12 xl:px-40"
    >
      <Col xs={{ span: 12, order: 1 }} md={{ span: 5, order: 1 }}>
        <div className="logo">Logo</div>
      </Col>

      <Col xs={{ span: 24, order: 3 }} md={{ span: 14, order: 2 }}>
        <HeaderAutoComplete />
      </Col>

      <Col
        xs={{ span: 12, order: 2 }}
        md={{ span: 5, order: 3 }}
        style={{ textAlign: "right" }}
      >
        <div className="contact">Contact</div>
      </Col>
    </Row>
  );
};
export default Header;
