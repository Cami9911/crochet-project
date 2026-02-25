import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "./AllProductsData";
import ControlFilters from "./filters/ControlFilters";
import { routeToFilter } from "./SideMenuFilters";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const GridContent: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const selectedColors = searchParams.getAll("color");
  const selectedSizes = searchParams.getAll("size");
  const selectedHandles = searchParams.getAll("handle");
  const selectedStyles = searchParams.getAll("style");

  const filteredProducts = useMemo(() => {
    const routePredicate = routeToFilter[pathname] ?? (() => true);

    return allProducts.filter((p) => {
      const okRoute = routePredicate(p);

      const filterColors =
        selectedColors.length === 0 || selectedColors.includes(p.color);

      const filterSizes =
        selectedSizes.length === 0 || selectedSizes.includes(p.size);

      const filterHandles =
        selectedHandles.length === 0 || selectedHandles.includes(p.handle);

      const filterStyles =
        selectedStyles.length === 0 || selectedStyles.includes(p.style);

      return (
        okRoute && filterColors && filterSizes && filterHandles && filterStyles
      );
    });
  }, [
    pathname,
    selectedColors,
    selectedSizes,
    selectedHandles,
    selectedStyles,
  ]);

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
