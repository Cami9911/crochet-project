import React from "react";
import { Drawer } from "antd";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";

interface FilterDrawerProps {
  handleClose: () => void;
  open: boolean;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose, open }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const selectedColors = searchParams.getAll("color");

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

  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={handleClose}
        open={open}
      >
        <ColorsFilter
          // selectedColors={selectedColors}
          onToggleColors={toggleColors}
        />
      </Drawer>
    </>
  );
};

export default FilterDrawer;
