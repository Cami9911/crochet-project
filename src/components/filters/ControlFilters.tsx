import React, { useState } from "react";
import { Button } from "antd";
import FilterDrawer from "./FilterDrawer";
import SorterDrawer from "./SorterDrawer";

const ControlFilters: React.FC = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [openSorterDrawer, setOpenSorterDrawer] = useState(false);

  const showFilterDrawer = () => {
    setOpenFilterDrawer(true);
  };

  const onCloseFilterDrawer = () => {
    setOpenFilterDrawer(false);
  };

  const showSorterDrawer = () => {
    setOpenSorterDrawer(true);
  };

  const onCloseSorterDrawer = () => {
    setOpenSorterDrawer(false);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex">
        <Button
          className="rounded-r-none! border-r-[0.25px]! border-r-white! w-32"
          color="default"
          variant="solid"
          onClick={showSorterDrawer}
        >
          Sorteaza
        </Button>
        <Button
          className="rounded-l-none! w-32"
          color="default"
          variant="solid"
          onClick={showFilterDrawer}
        >
          Filtreaza
        </Button>
      </div>
      <FilterDrawer handleClose={onCloseFilterDrawer} open={openFilterDrawer} />
      <SorterDrawer handleClose={onCloseSorterDrawer} open={openSorterDrawer} />
    </>
  );
};

export default ControlFilters;
