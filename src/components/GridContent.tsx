import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "./AllProductsData";
import ControlFilters from "./filters/ControlFilters";
import { routeToFilter } from "./sidemenu/SideMenuFilters";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useSetAtom } from "jotai";
import {
  selectedColorAtom,
  selectedProductAtom,
  totalResultsAtom,
} from "../storageAtoms";
import { products } from "./productData";

const GridContent: React.FC = () => {
  const navigate = useNavigate();

  const setTotalResults = useSetAtom(totalResultsAtom);
  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const setSelectedColor = useSetAtom(selectedColorAtom);

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

  const goToDetails = (key: string) => {
    const product = products.find((p) => p.key === key) ?? null;
    setSelectedProduct(product);
    setSelectedColor(product?.color);

    navigate(`product-details/${key}`);
  };

  useEffect(() => {
    setTotalResults(filteredProducts.length);
  }, [filteredProducts.length, setTotalResults]);

  return (
    <Content className="relative">
      <ControlFilters />

      <Row gutter={16}>
        {filteredProducts?.map(({ key, label, src }) => {
          return (
            <Col
              className="gutter-row"
              span={12}
              lg={{ span: 6 }}
              key={key}
              onClick={() => goToDetails(key)}
            >
              <Image alt="example" className="" src={src} preview={false} />
              <div>{label}</div>
            </Col>
          );
        })}
      </Row>
    </Content>
  );
};
export default GridContent;
