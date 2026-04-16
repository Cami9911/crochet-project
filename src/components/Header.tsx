import { Row, Col, Button } from "antd";
import HeaderAutoComplete from "./HeaderAutoComplete";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import logoUrl from "../assets/stelas_crochet.svg";

const Header: React.FC = () => {
  return (
    <Row
      // gutter={[16, 16]}
      align="middle"
      className="h-24 xs:h-16 md:h-16 md:mt-6 px-4 sm:px-2 md:px-12 xl:px-40"
    >
      <Col xs={{ span: 12, order: 1 }} md={{ span: 5, order: 1 }}>
        <img src={logoUrl} alt="Stela's Crochet" width={100} />
      </Col>

      <Col xs={{ span: 24, order: 3 }} md={{ span: 14, order: 2 }}>
        <HeaderAutoComplete />
      </Col>

      <Col
        xs={{ span: 12, order: 2 }}
        md={{ span: 5, order: 3 }}
        style={{ textAlign: "right" }}
      >
        <Row className="items-center justify-end">
          <Col>
            <Button type="link" className="p-0!">
              Contact
            </Button>
          </Col>
          <Col>
            <Button
              type="link"
              size="large"
              icon={<InstagramOutlined />}
              href="https://www.instagram.com/stelas.crochet/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Col>
          <Col>
            <Button
              type="link"
              size="large"
              icon={<FacebookOutlined />}
              href="https://www.facebook.com/profile.php?id=61559640265528"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4!"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Header;
