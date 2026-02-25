import React, { useEffect, useState } from "react";
import { Checkbox, Col, GetProp, Row } from "antd";
import { colors } from "../filtersData";

type ColorsFiltersProps = {
  onToggleFilters: (filter: string, color: string) => void;
  resetKey: number;
};

const ColorsFilter: React.FC<ColorsFiltersProps> = ({
  onToggleFilters,
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

    onToggleFilters("color", name);
  };

  useEffect(() => {
    setSelectedColors([]);
  }, [resetKey]);

  return (
    <Checkbox.Group
      style={{ width: "100%" }}
      value={selectedColors}
      onChange={onChange}
    >
      <Row gutter={[8, 16]}>
        {colors.map(({ name, code }) => {
          const checked = selectedColors.includes(name);

          return (
            <Col key={name} span={6}>
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
      </Row>
    </Checkbox.Group>
  );
};

export default ColorsFilter;
