import React from "react";
import { Button, Flex } from "antd";
import { useSetAtom } from "jotai";
import {
  isOpenedFilterDrawerAtom,
  openedFilterDrawerAtom,
  selectedFilterAtom,
} from "../storageAtoms";

const HorizontalFilters: React.FC = () => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const setOpenedFilterDrawer = useSetAtom(openedFilterDrawerAtom);
  const setIsOpenedFilterDrawer = useSetAtom(isOpenedFilterDrawerAtom);

  return (
    <Flex
      gap="small"
      className="sticky z-900 bg-white-bg"
      style={{ top: "137px" }}
    >
      <div className="hidden sm:flex pb-2 mb-2 gap-4 overflow-x-auto whitespace-nowrap lg:max-w-full min-[880px]:max-w-full min-[768px]:max-w-md min-[640px]:max-w-sm min-[460px]:max-w-124 max-w-64">
        <Button
          onClick={() => {
            setIsOpenedFilterDrawer(true);
            setOpenedFilterDrawer("all-filters");
            setSelectedFilter({ key: "all-filters", name: "all-filters" });
          }}
        >
          Culoare
        </Button>
        <Button>Marimea posetei</Button>
        <Button>Material</Button>
        <Button>Tipul manerului gentii</Button>
        <Button>Tip de geanta</Button>
      </div>
    </Flex>
  );
};

export default HorizontalFilters;
