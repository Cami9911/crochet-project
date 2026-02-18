import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "./AllProductsData";
import ControlFilters from "./filters/ControlFilters";
import { routeToFilter } from "./SideMenuFilters";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const GridContent: React.FC = () => {
  const { pathname } = useLocation();
  // const predicate = routeToFilter[pathname] ?? (() => true);
  // const filteredProducts = allProducts.filter(predicate);

  const [searchParams] = useSearchParams();
  const selectedColors = searchParams.getAll("color");

  const filteredProducts = useMemo(() => {
    const routePredicate = routeToFilter[pathname] ?? (() => true);

    return allProducts.filter((p) => {
      const okRoute = routePredicate(p);

      const okColor =
        selectedColors.length === 0 || selectedColors.includes(p.color);

      return okRoute && okColor;
    });
  }, [pathname, selectedColors]);

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
