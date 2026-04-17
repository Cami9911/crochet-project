import { Col, Row } from "antd";
import ContactForm from "./contact/ContactForm";
import ContactData from "./contact/ContactData";

const Contact = () => {
  return (
    <Row className=" px-4 sm:px-2 md:px-12 xl:px-40">
      <Col span={17}>
        <ContactForm />
      </Col>
      <Col span={7}>
        <ContactData />
      </Col>
    </Row>
  );
};

export default Contact;
