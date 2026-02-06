import { Input, Row, Col } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const Header: React.FC = () => {
  return (
    <Row
      // gutter={[16, 16]}
      align="middle"
      className="h-24 xs:h-16 md:h-16 md:mt-6 "
    >
      <Col xs={{ span: 12, order: 1 }} md={{ span: 5, order: 1 }}>
        <div className="logo">Logo</div>
      </Col>

      <Col xs={{ span: 24, order: 3 }} md={{ span: 14, order: 2 }}>
        <Search size="large" onSearch={onSearch} />
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
