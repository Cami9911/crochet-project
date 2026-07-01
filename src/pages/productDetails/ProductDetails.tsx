import { Breadcrumb, Col, Row } from "antd";
import "./ProductDetails.scss";
import { products } from "../../productData";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ProductImagesWeb from "./ProductImagesWeb";
import ProductImagesMobile from "./ProductImagesMobile";
import ProductImagesExtra from "./ProductImagesExtra";
import { useAtomValue } from "jotai";
import { selectedProductAtom } from "../../storageAtoms";
import { ro } from "../../translations";
import { capitalizeFirst, useIsDesktop } from "../../useFunctions";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.key === id);

  const selectedProduct = useAtomValue(selectedProductAtom);

  const isDesktop = useIsDesktop();

  const productColor = id?.split("F00")[1].toLowerCase();
  const sameColorProducts = productColor
    ? products.filter(
        (p) => p.color === productColor && p.key !== selectedProduct?.key,
      )
    : [];

  const similarColorProducts = productColor
    ? products.filter((p) => p.similarColors.includes(productColor))
    : [];
  const colorProducts = [...sameColorProducts, ...similarColorProducts];

  const similarCategoryProducts = selectedProduct
    ? products.filter(
        (p) =>
          p.category === selectedProduct?.category &&
          p.key !== selectedProduct?.key,
      )
    : [];

  return (
    <>
      <Breadcrumb
        separator=">"
        className="py-2! sm:mb-6! px-4! sm:px-2! md:px-12! xl:px-40!"
        items={[
          {
            title: <a href="/">Toate produsele</a>,
          },
          {
            title: (
              <a href={"/" + product?.category}>
                {capitalizeFirst(ro.breadcrumb[product?.category || ""])}
              </a>
            ),
          },
          {
            title: <p>{product?.name || ""}</p>,
          },
        ]}
      />
      <Row>
        {isDesktop ? (
          <ProductImagesWeb />
        ) : (
          <Col span={24}>
            <ProductImagesMobile />
          </Col>
        )}

        <ProductInfo />
      </Row>
      <Row>
        <ProductImagesExtra
          similarProducts={colorProducts}
          title={"Produse într-o culoare similară"}
        />
      </Row>
      <Row>
        <ProductImagesExtra
          similarProducts={similarCategoryProducts}
          title={"Produse din aceeași categorie"}
        />
      </Row>
    </>
  );
};

export default ProductDetails;
