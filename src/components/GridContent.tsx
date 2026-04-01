import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "./AllProductsData";
import ControlFilters from "./filters/ControlFilters";
import { routeToFilter } from "./sidemenu/SideMenuFilters";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedColorAtom,
  selectedProductAtom,
  totalResultsAtom,
  urlHoverImageAtom,
} from "../storageAtoms";
import { products } from "../productData";
import { productType } from "../types";
import { colors } from "./filters/filtersData";
import ColorSelectionWeb from "../pages/productDetails/ColorSelectionWeb";

const GridContent: React.FC = () => {
  const navigate = useNavigate();

  const [hoveredProductKey, setHoveredProductKey] = useState<string | null>(
    null,
  );

  const setTotalResults = useSetAtom(totalResultsAtom);
  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const setSelectedColor = useSetAtom(selectedColorAtom);

  const urlHoverImage = useAtomValue(urlHoverImageAtom);

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

  const capitalizeFirst = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

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

      <Row gutter={16} className="">
        {filteredProducts?.map(
          ({ key, src, secondImage, style, color, stock }) => {
            const isHovered = hoveredProductKey === key;
            const imageSrc = isHovered ? "/src/assets/" + secondImage : src;
            const selectionHoveredImg = "/src/assets/" + urlHoverImage;

            const uniqueID = key?.split("F00")[0];

            const productColors = uniqueID
              ? filteredProducts
                  .filter((p) => p.key.split("F00")[0] === uniqueID)
                  .map((p: productType) => p.color)
              : [];

            return (
              <Col
                className="gutter-row mb-4 lg:min-h-[360px]! xl:min-h-[390px]! 2xl:min-h-[530px]!"
                span={12}
                lg={{ span: 6 }}
                key={key}
                onClick={() => goToDetails(key)}
                onMouseEnter={() => setHoveredProductKey(key)}
                onMouseLeave={() => setHoveredProductKey(null)}
              >
                <Image
                  alt="example"
                  className="cursor-pointer"
                  src={
                    urlHoverImage && isHovered ? selectionHoveredImg : imageSrc
                  }
                  preview={false}
                />

                <p className="mt-2 font-semibold">Geanta {style}</p>
                <p className="">
                  {stock ? "Produs in stoc" : "Produs pe comanda"}
                </p>

                {isHovered ? (
                  <ColorSelectionWeb
                    hoverProductKey={hoveredProductKey || ""}
                  />
                ) : (
                  <>
                    <div className="mt-2">
                      Culoare · {capitalizeFirst(color)}
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      {productColors?.map((color: string, index: number) => {
                        const colorCode = colors.find(
                          (c) => c.name === color,
                        )?.code;

                        return (
                          <span
                            key={index}
                            className="inline-block h-3 w-3 rounded-full border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: colorCode }}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              </Col>
            );
          },
        )}
      </Row>
    </Content>
  );
};
export default GridContent;
