import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, ConfigProvider, Divider, Row } from "antd";

const whatsappNumber = +40745109860;

const ContactData = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          //   colorLink: "#fff",
          //   colorBgContainer: "#a06518",
          //colorBorderSecondary: "#a06518",
        },
      }}
    >
      <Card>
        <Row>
          <Col>
            <Button
              type="link"
              size="large"
              icon={<WhatsAppOutlined />}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Buna! As dori sa aflu mai multe detalii despre produsele tale!")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Trimite-mi mesaj pe WhatsApp
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            <Button
              type="link"
              size="large"
              icon={<InstagramOutlined />}
              href="https://www.instagram.com/stelas.crochet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vezi profilul de Instagram
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            <Button
              type="link"
              size="large"
              icon={<FacebookOutlined />}
              href="https://www.facebook.com/profile.php?id=61559640265528"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vezi profilul de Facebook
            </Button>
          </Col>
        </Row>
      </Card>
    </ConfigProvider>
  );
};
export default ContactData;
