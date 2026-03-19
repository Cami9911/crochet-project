import { Breadcrumb, Col, Row } from "antd";
import "./ProductDetails.scss";
import { products } from "../../components/productData";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { productType } from "../../types";
import ProductDescription from "./ProductDescription";
import ProductImages from "./ProductImages";
import ProductImagesCarousel from "./ProductImagesCarousel";
import ProductImagesExtra from "./ProductImagesExtra";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.key === id);

  const [selectedProduct, setSelectedProduct] = useState<
    productType | undefined
  >(product);

  const uniqueID = id?.split("F00")[1].toLowerCase();
  const sameColorProducts = uniqueID
    ? products.filter((p) => p.color === uniqueID)
    : [];

  const similarColorProducts = uniqueID
    ? products.filter((p) => p.similarColors.includes(uniqueID))
    : [];
  const colorProducts = [...sameColorProducts, ...similarColorProducts];

  const similarStyleProducts = selectedProduct
    ? products.filter((p) => p.style === selectedProduct?.style)
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
        <ProductImages selectedProduct={selectedProduct} />

        <Col span={24} xs={24} md={0}>
          <ProductImagesCarousel selectedProduct={selectedProduct} />
        </Col>

        <ProductDescription
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
        />
      </Row>
      <Row>
        <ProductImagesExtra
          setSelectedProduct={setSelectedProduct}
          similarProducts={colorProducts}
          title={"Produse într-o culoare similară"}
        />
      </Row>
      <Row>
        <ProductImagesExtra
          setSelectedProduct={setSelectedProduct}
          similarProducts={similarStyleProducts}
          title={"Produse din aceeași categorie"}
        />
      </Row>
    </>
  );
};

export default ProductDetails;
