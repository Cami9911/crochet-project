import { Col, Row } from "antd";
import ContactForm from "./ContactForm";
import ContactOptions from "../../components/ContactOptions";

const Contact = () => {
  return (
    <div className=" px-4 sm:px-2 md:px-12 xl:px-40">
      <Row className="flex justify-center items-center bg-[#a06518] h-48 text-white rounded-xl">
        <p className="text-[24px] sm:text-[32px] lg:text-[40px] text-center">
          Contacteaza-ma pentru mai multe informatii
        </p>
      </Row>
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
      <Row gutter={[48, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className="border border-gray-200 p-6 rounded-xl">
            <span className="text-base font-semibold flex mb-4">
              Trimite-mi un mail
            </span>
            <ContactForm />
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className="border border-gray-200 p-6 rounded-xl">
            <span className="text-base font-semibold flex mb-4">
              Sau contactează-mă direct
            </span>
            <ContactOptions />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
