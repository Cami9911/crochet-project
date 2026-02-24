import { CheckOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";

const sizes = [
  {
    name: "Mica",
    key: "small",
  },
  {
    name: "Medie",
    key: "medium",
  },
  {
    name: "Mare",
    key: "big",
  },
];

type SizesFiltersProps = {
  onToggleFilters: (filter: string, color: string) => void;
  resetKey: number;
};

const SizeFilters: React.FC<SizesFiltersProps> = ({
  onToggleFilters,
  resetKey,
}) => {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);

  const selectSize = (keySize: string) => {
    setSelectedSize((allSizes) => {
      const isSizeAlreadySelected = allSizes.includes(keySize);

      const next = isSizeAlreadySelected
        ? allSizes.filter((s) => s != keySize)
        : [...allSizes, keySize];

      return next;
    });

    onToggleFilters("size", keySize);
  };

  useEffect(() => {
    setSelectedSize([]);
  }, [resetKey]);

  return (
    <Row gutter={[0, 24]}>
      {sizes.map(({ name, key }) => (
        <Col span={24} key={key}>
          <Row key={key}>
            <Col span={22} onClick={() => selectSize(key)}>
              {name}
            </Col>
            <Col span={2}>
              {selectedSize.includes(key) && <CheckOutlined />}
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default SizeFilters;
