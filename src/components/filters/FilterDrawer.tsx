import React, { useState } from "react";
import { Button, Drawer, Flex } from "antd";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";

interface FilterDrawerProps {
  handleClose: () => void;
  open: boolean;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose, open }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetColorsKey, setResetColorsKey] = useState(0);

  const toggleColors = (colorName: string) => {
    const current = new Set(searchParams.getAll("color")); //negru
    const next = new URLSearchParams(searchParams); //create a copy of all url params

    // remove all first, then re-add (easiest to keep clean)
    next.delete("color");

    if (current.has(colorName)) current.delete(colorName);
    else current.add(colorName);

    // re-add to URL
    [...current].forEach((c) => next.append("color", c));

    setSearchParams(next);
  };

  const removeAllColors = () => {
    setResetColorsKey((k) => k + 1);

    const next = new URLSearchParams(searchParams);
    next.delete("color");
    setSearchParams(next);
  };

  const footer: React.ReactNode = (
    <Flex gap="middle" justify="flex-end">
      <Button
        onClick={() => removeAllColors()}
        styles={{
          root: {
            borderColor: "#ccc",
            color: "#171717",
            backgroundColor: "#fff",
          },
        }}
      >
        Eliminare
      </Button>
      <Button
        type="primary"
        styles={{ root: { backgroundColor: "#171717" } }}
        onClick={() => handleClose()}
      >
        Vezi
      </Button>
    </Flex>
  );

  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={handleClose}
        open={open}
        footer={footer}
      >
        <ColorsFilter
          // selectedColors={selectedColors}
          onToggleColors={toggleColors}
          resetKey={resetColorsKey}
        />
      </Drawer>
    </>
  );
};

export default FilterDrawer;
