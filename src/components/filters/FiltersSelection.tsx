import { CheckOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { FilterProps } from "../types";
import { selectedFiltersValuesAtom } from "../../storageAtoms";
import { useAtomValue } from "jotai";

type FiltersSelectionProps = {
  onToggleSelection: (filter: string, name: string) => void;
  filtersData: FilterProps[];
  keyToCheck: string;
};

const FiltersSelection: React.FC<FiltersSelectionProps> = ({
  onToggleSelection,
  filtersData,
  keyToCheck,
}) => {
  const selectedFiltersValues = useAtomValue(selectedFiltersValuesAtom);

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
