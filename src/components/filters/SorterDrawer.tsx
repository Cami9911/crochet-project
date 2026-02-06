import React from "react";
import { Drawer } from "antd";

interface SorterDrawerProps {
  handleClose: () => void;
  open: boolean;
}

const SorterDrawer: React.FC<SorterDrawerProps> = ({ handleClose, open }) => {
  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={handleClose}
        open={open}
      >
        <p>Sorter...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default SorterDrawer;
