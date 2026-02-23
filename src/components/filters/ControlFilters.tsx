import React from "react";
import { Button } from "antd";
import FilterDrawer from "./FilterDrawer";
import SorterDrawer from "./SorterDrawer";
import { useSetAtom } from "jotai";
import {
  isOpenedFilterDrawerAtom,
  isOpenedSorterDrawerAtom,
  openedFilterDrawerAtom,
} from "../../storageAtoms";

const ControlFilters: React.FC = () => {
  const setOpenedFilterDrawer = useSetAtom(openedFilterDrawerAtom);

  const setIsOpenedFilterDrawer = useSetAtom(isOpenedFilterDrawerAtom);
  const setIsOpenedSorterDrawer = useSetAtom(isOpenedSorterDrawerAtom);

  const showFilterDrawer = () => {
    setIsOpenedFilterDrawer(true);
  };

  const onCloseFilterDrawer = () => {
    setOpenedFilterDrawer("all-filters");
    setIsOpenedFilterDrawer(false);
  };

  const showSorterDrawer = () => {
    setIsOpenedSorterDrawer(true);
  };

  const onCloseSorterDrawer = () => {
    setIsOpenedSorterDrawer(false);
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
      <FilterDrawer handleClose={onCloseFilterDrawer} />
      <SorterDrawer handleClose={onCloseSorterDrawer} />
    </>
  );
};

export default ControlFilters;
