import { CheckOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { FilterProps } from "../types";

type FiltersSelectionProps = {
  selectedFiltersValues: string[];
  onToggleSelection: (filter: string, name: string) => void;
  filtersData: FilterProps[];
  keyToCheck: string;
};

const FiltersSelection: React.FC<FiltersSelectionProps> = ({
  selectedFiltersValues,
  onToggleSelection,
  filtersData,
  keyToCheck,
}) => {
  return (
    <Row gutter={[0, 24]}>
      {filtersData.map(({ name, key }) => (
        <Col span={24} key={key}>
          <Row key={key}>
            <Col span={22} onClick={() => onToggleSelection(keyToCheck, key)}>
              {name}
            </Col>
            <Col span={2}>
              {selectedFiltersValues.includes(key) && <CheckOutlined />}
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default FiltersSelection;
