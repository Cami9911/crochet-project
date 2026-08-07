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
import FilterIcon from "../../assets/icons/filter.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";

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
          className="sort-btn rounded-r-none! border-r-[0.25px]! border-r-gray-400! border-white!  w-40 sm:w-56 "
          color="default"
          variant="solid"
          size="large"
          shape="round"
          onClick={showSorterDrawer}
          icon={<SortIcon width={16} height={16} />}
        >
          Sortează
        </Button>
        <Button
          className="filter-btn rounded-l-none! border-r-[0.25px]! border-l-gray-400! border-white! w-40 sm:w-56"
          color="default"
          variant="solid"
          size="large"
          shape="round"
          onClick={showFilterDrawer}
          icon={<FilterIcon width={16} height={16} />}
        >
          Filtrează
        </Button>
      </div>
      <FilterDrawer handleClose={onCloseFilterDrawer} />
      <SorterDrawer handleClose={onCloseSorterDrawer} />
    </>
  );
};

export default ControlFilters;
