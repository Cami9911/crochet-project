import { CheckOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { FilterProps } from "../types";

type FiltersSelectionProps = {
  onToggleFilters: (filter: string, color: string) => void;
  resetKey: number;
  filtersData: FilterProps[];
  keyToCheck: string;
};

const FiltersSelection: React.FC<FiltersSelectionProps> = ({
  onToggleFilters,
  resetKey,
  filtersData,
  keyToCheck,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const selectFilters = (filterKey: string) => {
    setSelectedFilters((allFilters) => {
      const isFilterAlreadySelected = allFilters.includes(filterKey);

      const next = isFilterAlreadySelected
        ? allFilters.filter((s) => s != filterKey)
        : [...allFilters, filterKey];

      return next;
    });

    onToggleFilters(keyToCheck, filterKey);
  };

  useEffect(() => {
    setSelectedFilters([]);
  }, [resetKey]);

  return (
    <Row gutter={[0, 24]}>
      {filtersData.map(({ name, key }) => (
        <Col span={24} key={key}>
          <Row key={key}>
            <Col span={22} onClick={() => selectFilters(key)}>
              {name}
            </Col>
            <Col span={2}>
              {selectedFilters.includes(key) && <CheckOutlined />}
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default FiltersSelection;
