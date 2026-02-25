import React from "react";
import { Button, Flex } from "antd";
import { useSetAtom } from "jotai";
import { isOpenFilterDrawerAtom, selectedFilterAtom } from "../storageAtoms";

const HorizontalFilters: React.FC = () => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const setisOpenFilterDrawer = useSetAtom(isOpenFilterDrawerAtom);

  return (
    <Flex
      gap="small"
      className="sticky z-900 bg-white-bg"
      style={{ top: "137px" }}
    >
      <div className="hidden sm:flex pb-2 mb-2 gap-4 overflow-x-auto whitespace-nowrap lg:max-w-full min-[880px]:max-w-full min-[768px]:max-w-md min-[640px]:max-w-sm min-[460px]:max-w-124 max-w-64">
        <Button
          onClick={() => {
            setisOpenFilterDrawer(true);
            setSelectedFilter({ key: "color", name: "Culoare" });
          }}
        >
          Culoare
        </Button>
        <Button
          onClick={() => {
            setisOpenFilterDrawer(true);
            setSelectedFilter({ key: "size", name: "Dimensiune" });
          }}
        >
          Marimea posetei
        </Button>
        <Button>Material</Button>
        <Button
          onClick={() => {
            setisOpenFilterDrawer(true);
            setSelectedFilter({
              key: "handle",
              name: "Tipul manerului gentii",
            });
          }}
        >
          Tipul manerului gentii
        </Button>
        <Button
          onClick={() => {
            setisOpenFilterDrawer(true);
            setSelectedFilter({ key: "style", name: "Stil" });
          }}
        >
          Stilul gentii
        </Button>
      </div>
    </Flex>
  );
};

export default HorizontalFilters;
