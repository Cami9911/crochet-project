import { CheckOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { FilterProps } from "../../types";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();

  return (
    <Row gutter={[0, 24]}>
      {filtersData.map(({ name, key }) => {
        const isChecked = searchParams.getAll(keyToCheck).includes(key);
        return (
          <Col span={24} key={key} className="hover:bg-gray-100">
            <Row key={key}>
              <Col span={22} onClick={() => onToggleSelection(keyToCheck, key)}>
                {name}
              </Col>
              <Col span={2}>{isChecked && <CheckOutlined />}</Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

export default FiltersSelection;
