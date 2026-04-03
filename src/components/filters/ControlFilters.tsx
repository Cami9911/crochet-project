import React from "react";
import { Button } from "antd";
import FilterDrawer from "./FilterDrawer";
import SorterDrawer from "./SorterDrawer";
import { useSetAtom } from "jotai";
import {
  isOpenFilterDrawerAtom,
  isOpenSorterDrawerAtom,
  selectedFilterAtom,
} from "../../storageAtoms";

const ControlFilters: React.FC = () => {
  const setisOpenFilterDrawer = useSetAtom(isOpenFilterDrawerAtom);
  const setIsOpenedSorterDrawer = useSetAtom(isOpenSorterDrawerAtom);

  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const showFilterDrawer = () => {
    setisOpenFilterDrawer(true);
  };

  const onCloseFilterDrawer = () => {
    setSelectedFilter({ key: "all-filters", name: "all-filters" });
    setisOpenFilterDrawer(false);
  };

  const showSorterDrawer = () => {
    setIsOpenedSorterDrawer(true);
  };

  const onCloseSorterDrawer = () => {
    setIsOpenedSorterDrawer(false);
  };

  return (
    <>
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex">
        <Button
          className="sort-btn rounded-r-none! border-r-[0.25px]! border-r-white! w-32 sm:w-48"
          color="default"
          variant="solid"
          size="large"
          onClick={showSorterDrawer}
        >
          Sorteaza
        </Button>
        <Button
          className="filter-btn rounded-l-none! w-32 sm:w-48"
          color="default"
          variant="solid"
          size="large"
          onClick={showFilterDrawer}
        >
          Filtreaza
        </Button>
      </div>
      <FilterDrawer handleClose={onCloseFilterDrawer} />
      <SorterDrawer handleClose={onCloseSorterDrawer} />
    </>
  );
};

export default ControlFilters;
