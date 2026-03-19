import React from "react";
import { Carousel, Col } from "antd";
import { productType } from "../../types";
import { useNavigate } from "react-router-dom";
import { products } from "../../components/productData";

type SimilarProductsProps = {
  similarProducts: productType[];
  title: string;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<productType | undefined>
  >;
};

const images = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../../assets/${imageName}`];

const ProductImagesExtra: React.FC<SimilarProductsProps> = ({
  similarProducts,
  title,
  setSelectedProduct,
}) => {
  const navigate = useNavigate();

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const loadProduct = (product: productType) => {
    const selectedProduct = products.find((item) => item.key === product.key);
    setSelectedProduct(selectedProduct);
    navigate(`/product-details/${product.key}`);
  };

  return (
    <Col className="mt-16 px-4 sm:px-0 sm:pl-2 md:px-12 xl:px-40">
      <p className="mb-6 text-xl font-semibold">{title}</p>
      <Carousel
        afterChange={onChange}
        className="mb-2 w-full"
        arrows
        dots={false}
        slidesToShow={6}
        responsive={[
          {
            breakpoint: 1280,
            settings: { slidesToShow: 4 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 480,
            settings: { slidesToShow: 1 },
          },
        ]}
      >
        {similarProducts.map((product: productType, index: number) => {
          const src = getImage(product.firstImage);
          return (
            <div key={index} onClick={() => loadProduct(product)}>
              <img
                src={src}
                alt={`product-${index}`}
                className="w-full h-auto px-1"
              />
            </div>
          );
        })}
      </Carousel>
    </Col>
  );
};

export default ProductImagesExtra;
