import { Breadcrumb, Col, Row } from "antd";
import "./ProductDetails.scss";
import { products } from "../../components/productData";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ProductImages from "./ProductImages";
import ProductImagesCarousel from "./ProductImagesCarousel";
import ProductImagesExtra from "./ProductImagesExtra";
import { useAtomValue } from "jotai";
import { selectedProductAtom } from "../../storageAtoms";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.key === id);

  const selectedProduct = useAtomValue(selectedProductAtom);

  const uniqueID = id?.split("F00")[1].toLowerCase();
  const sameColorProducts = uniqueID
    ? products.filter(
        (p) => p.color === uniqueID && p.key !== selectedProduct?.key,
      )
    : [];

  const similarColorProducts = uniqueID
    ? products.filter((p) => p.similarColors.includes(uniqueID))
    : [];
  const colorProducts = [...sameColorProducts, ...similarColorProducts];

  const similarStyleProducts = selectedProduct
    ? products.filter(
        (p) =>
          p.style === selectedProduct?.style && p.key !== selectedProduct?.key,
      )
    : [];

  return (
    <>
      <Breadcrumb
        separator=">"
        className="mb-6! px-4! sm:px-2! md:px-12! xl:px-40!"
        items={[
          {
            title: <a href="/">Genti</a>,
          },
          {
            title: (
              <span>
                {product?.category} {product?.style}
              </span>
            ),
          },
        ]}
      />
      <Row>
        <ProductImages />

        <Col span={24} xs={24} md={0}>
          <ProductImagesCarousel />
        </Col>

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
          similarProducts={similarStyleProducts}
          title={"Produse din aceeași categorie"}
        />
      </Row>
    </>
  );
};

export default ProductDetails;
