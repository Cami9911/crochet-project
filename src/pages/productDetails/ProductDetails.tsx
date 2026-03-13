import { Breadcrumb, Row } from "antd";
import "./ProductDetails.scss";
import { products } from "../../components/productData";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { productType } from "../../types";
import ProductDescription from "./ProductDescription";
import ProductImages from "./ProductImages";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.key === id);

  const [selectedProduct, setSelectedProduct] = useState<
    productType | undefined
  >(product);

  return (
    <>
      <Breadcrumb
        separator=">"
        className="mb-6!"
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
        <ProductDescription
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
        />
      </Row>
    </>
  );
};

export default ProductDetails;
