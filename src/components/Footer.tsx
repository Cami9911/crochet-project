import { Footer } from "antd/es/layout/layout";

const FooterCmp = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
        Stela's Crochet ©{new Date().getFullYear()} Created by Tirnovan Camelia
      </Footer>
  );
};
export default FooterCmp;
