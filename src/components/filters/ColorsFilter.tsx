import React from "react";
import { Col, Row } from "antd";

const colors = [
  {
    name: "transparent",
    code: "rgba(226, 222, 222, 0.349)",
  },
  {
    name: "alb",
    code: "#fff",
  },
  {
    name: "negru",
    code: "#000",
  },
  {
    name: "visiniu",
    code: "rgb(136, 7, 32)",
  },
  {
    name: "verde",
    code: "rgb(96, 144, 109)",
  },
  {
    name: "roz",
    code: "rgb(201, 131, 168)",
  },
];

type ColorsFiltersProps = {
  onToggleColors: (color: string) => void;
};

const ColorsFilter: React.FC<ColorsFiltersProps> = ({ onToggleColors }) => (
  <Row gutter={[8, 16]}>
    {colors.map(({ name, code }) => {
      return (
        <Col key={name} xs={{ span: 5 }} lg={{ span: 6 }}>
          <button className="w-full" onClick={() => onToggleColors(name)}>
            <div
              className="h-12 border border-gray-200 transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{ backgroundColor: code }}
            ></div>
            <span>{name}</span>
          </button>
        </Col>
      );
    })}
  </Row>
);

export default ColorsFilter;
