import { Footer } from "antd/es/layout/layout";

const FooterCmp = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <div className="bg-white-bg">
        Stela's Crochet ©{new Date().getFullYear()} Created by Tirnovan Camelia
      </div>
    </Footer>
  );
};
export default FooterCmp;
