import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "./AllProductsData";
import ControlFilters from "./filters/ControlFilters";
import { routeToFilter } from "./SideMenuFilters";
import { useLocation } from "react-router-dom";

const GridContent: React.FC = () => {
  const { pathname } = useLocation();
  const predicate = routeToFilter[pathname] ?? (() => true);
  const filteredProducts = allProducts.filter(predicate);

  return (
    <Content className="relative">
      <ControlFilters />

      <Row gutter={16}>
        {filteredProducts?.map(({ key, label, src }) => {
          return (
            <Col className="gutter-row" span={12} lg={{ span: 6 }} key={key}>
              <Image alt="example" className="" src={src} />
              <div>{label}</div>
            </Col>
          );
        })}
      </Row>
    </Content>
  );
};
export default GridContent;
