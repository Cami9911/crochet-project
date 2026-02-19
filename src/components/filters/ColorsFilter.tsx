import React, { useEffect, useState } from "react";
import { Checkbox, Col, GetProp, Row } from "antd";

const colors = [
  {
    name: "negru",
    code: "#000",
  },
  {
    name: "alb",
    code: "#fff",
  },
  {
    name: "gri",
    code: "rgb(216, 211, 217)",
  },
  {
    name: "crem",
    code: "rgb(245, 245, 220)",
  },
  {
    name: "bej",
    code: "rgb(222, 206, 165)",
  },
  {
    name: "portocaliu",
    code: "rgb(223, 136, 73)",
  },
  {
    name: "maro",
    code: "rgb(115, 69, 38)",
  },
  {
    name: "visiniu",
    code: "rgb(136, 7, 32)",
  },
  {
    name: "rosu",
    code: "rgb(202, 43, 43)",
  },
  {
    name: "roz",
    code: "rgb(201, 131, 168)",
  },
  {
    name: "violet",
    code: "rgb(118, 91, 139)",
  },
  {
    name: "albastru",
    code: "rgb(70, 110, 160)",
  },
  {
    name: "turcoaz",
    code: "rgb(80, 172, 180)",
  },
  {
    name: "verde",
    code: "rgb(96, 144, 109)",
  },
];

type ColorsFiltersProps = {
  onToggleColors: (color: string) => void;
  resetKey: number;
};

const ColorsFilter: React.FC<ColorsFiltersProps> = ({
  onToggleColors,
  resetKey,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues,
  ) => {
    const checkedValuesCopy = checkedValues as string[];
    setSelectedColors(checkedValuesCopy);
  };

  const onToggleButton = (name: string) => {
    setSelectedColors((colors) => {
      const isColorAlreadySelected = colors.includes(name);

      const next = isColorAlreadySelected
        ? colors.filter((c) => c != name)
        : [...colors, name];

      return next;
    });

    onToggleColors(name);
  };

  useEffect(() => {
    setSelectedColors([]);
  }, [resetKey]);

  return (
    <Row gutter={[8, 16]}>
      <Checkbox.Group
        style={{ width: "100%" }}
        value={selectedColors}
        onChange={onChange}
      >
        {colors.map(({ name, code }) => {
          const checked = selectedColors.includes(name);

          return (
            <Col key={name} xs={{ span: 5 }} lg={{ span: 6 }}>
              <button className="w-full" onClick={() => onToggleButton(name)}>
                <div
                  className=" relative h-12 border border-gray-200 transition-all duration-200 hover:scale-105 cursor-pointer rounded-md"
                  style={{ backgroundColor: code }}
                >
                  {checked && (
                    <Checkbox
                      className="absolute bottom-0 right-0 h-4"
                      value={name}
                      checked={checked}
                    ></Checkbox>
                  )}
                </div>
                <span>{name}</span>
              </button>
            </Col>
          );
        })}
      </Checkbox.Group>
    </Row>
  );
};

export default ColorsFilter;
