import { Footer } from "antd/es/layout/layout";

const FooterCmp = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <div className="bg-white-bg my-8">
        Stela's Crochet ©{new Date().getFullYear()}
      </div>
    </Footer>
  );
};
export default FooterCmp;
