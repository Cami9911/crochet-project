import { Col, Row } from "antd";
import ContactForm from "./contact/ContactForm";
import ContactData from "./contact/ContactData";

const Contact = () => {
  return (
    <>
      <Row className="flex justify-center items-center bg-[#a06518] h-48 text-white ">
        <p className="text-[24px] sm:text-[32px] lg:text-[40px] text-center">
          Contacteaza-ma pentru mai multe informatii
        </p>
      </Row>
      <div className=" px-4 sm:px-2 md:px-12 xl:px-40">
        <Row className="mt-8 mb-12">
          <span>
            Daca unul dintre produsele mele ti-a facut cu ochiul, nu ezita sa ma
            contactezi! Poate ti-a placut culoarea unui produs, dar modelul
            altuia, sau poate doresti alte accesorii, nu este nicio problema.
            Contacteaza-ma si vedem ce putem rezolva!
          </span>
          <span>
            Mai jos gasesti un formular pentru a-mi trimite un mail sau si mai
            usor, paginile mele de social media (Instagram si Facebook) unde imi
            poti scrie direct.
          </span>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24, order: 2 }} lg={11} md={{ span: 12, order: 1 }}>
            <ContactForm />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            lg={{ span: 10, offset: 3 }}
            md={{ span: 11, offset: 1, order: 2 }}
          >
            <ContactData />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contact;
