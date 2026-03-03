import React from "react";
import { Col, Row } from "antd";
import { colors } from "../filtersData";
import { CheckOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

type ColorsFiltersProps = {
  onToggleSelection: (filter: string, name: string) => void;
};

const ColorsFilter: React.FC<ColorsFiltersProps> = ({ onToggleSelection }) => {
  const [searchParams] = useSearchParams();

  return (
    <Row gutter={[8, 16]}>
      {colors.map(({ name, code }) => {
        const isChecked = searchParams.getAll("color").includes(name);

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
              {isChecked && (
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
