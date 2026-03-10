import { Radio, RadioChangeEvent } from "antd";
import "./ImageRadioGroup.scss";
import { useParams } from "react-router-dom";
import { products } from "../components/productData";
import { productType } from "./types";

interface ImageRadioGroupProps {
  defaultProduct: productType;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<productType | undefined>
  >;
}

const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({
  defaultProduct,
  setSelectedProduct,
}) => {
  const { id } = useParams();
  const uniqueID = id?.split("F00")[0];
  const similarProducts = uniqueID
    ? products.filter((p) => p.key.includes(uniqueID))
    : [];

  const images = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const getImage = (imageName: string) => images[`../assets/${imageName}`];

  const changeImage = (e: RadioChangeEvent) => {
    console.log(e.target.value);

    const selectedProduct = products.find(
      (item) => item.key === e.target.value,
    );
    setSelectedProduct(selectedProduct);
  };

  return (
    <div className="my-12 flex flex-col">
      <span>CULOARE: {defaultProduct.color}</span>
      <Radio.Group
        value={defaultProduct.key}
        onChange={changeImage}
        className="image-radio-group"
      >
        <div className="flex">
          {similarProducts.map((item) => (
            <Radio key={item.key} value={item.key}>
              <div
                className="w-30"
                style={{
                  border:
                    defaultProduct.key === item.key
                      ? "1px solid #000"
                      : "1px solid #979797",
                }}
              >
                <img
                  src={getImage(item.firstImage)}
                  alt={item.category}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Radio>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
};

export default ImageRadioGroup;
