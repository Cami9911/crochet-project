import React from "react";
import { Col, Row } from "antd";
import { colors } from "../filtersData";
import { CheckOutlined } from "@ant-design/icons";

type ColorsFiltersProps = {
  selectedFiltersValues: string[];
  onToggleSelection: (filter: string, name: string) => void;
};

const ColorsFilter: React.FC<ColorsFiltersProps> = ({
  selectedFiltersValues,
  onToggleSelection,
}) => {
  return (
    <Row gutter={[8, 16]}>
      {colors.map(({ name, code }) => {
        const checked = selectedFiltersValues.includes(name);

        return (
          <Col
            key={name}
            span={6}
            onClick={() => onToggleSelection("color", name)}
          >
            <div
              className=" relative h-12 border border-gray-200 transition-all duration-200 hover:scale-105 cursor-pointer rounded-md"
              style={{ backgroundColor: code }}
            >
              {checked && (
                <div className="absolute bottom-0 right-0 rounded-sm bg-[#8484845e] flex justify-center h-5 w-5 text-white">
                  <CheckOutlined />
                </div>
              )}
            </div>
            <span>{name}</span>
          </Col>
        );
      })}
    </Row>
  );
};

export default ColorsFilter;
