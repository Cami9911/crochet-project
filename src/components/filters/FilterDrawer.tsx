import React from "react";
import { Drawer } from "antd";

interface FilterDrawerProps {
  handleClose: () => void;
  open: boolean;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose, open }) => {
  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={handleClose}
        open={open}
      >
        <p>Filter...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
