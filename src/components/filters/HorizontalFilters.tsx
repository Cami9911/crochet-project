import React from "react";
import { Badge, Button, Flex } from "antd";
import { useSetAtom } from "jotai";
import { isOpenFilterDrawerAtom, selectedFilterAtom } from "../../storageAtoms";
import { useSearchParams } from "react-router-dom";

const HorizontalFilters: React.FC = () => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const setIsOpenFilterDrawer = useSetAtom(isOpenFilterDrawerAtom);
  const [searchParams] = useSearchParams();

  return (
    <Flex
      gap="small"
      className="sticky z-900 bg-white-bg"
      style={{ top: "137px" }}
    >
      <div className="hidden sm:flex pb-2 mb-2 gap-4 overflow-x-auto whitespace-nowrap lg:max-w-full min-[880px]:max-w-full min-[768px]:max-w-md min-[640px]:max-w-sm min-[460px]:max-w-124 max-w-64">
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
            setSelectedFilter({ key: "style", name: "Stil" });
          }}
        >
          In stoc
          <Badge count={searchParams.getAll("stock")?.length} color="#000" />
        </Button>
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
            setSelectedFilter({ key: "color", name: "Culoare" });
          }}
        >
          Culoare
          <Badge count={searchParams.getAll("color")?.length} color="#000" />
        </Button>
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
            setSelectedFilter({ key: "size", name: "Dimensiune" });
          }}
        >
          Marimea posetei
          <Badge count={searchParams.getAll("size")?.length} color="#000" />
        </Button>
        <Button>Material</Button>
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
            setSelectedFilter({
              key: "handle",
              name: "Tipul manerului gentii",
            });
          }}
        >
          Tipul manerului gentii
          <Badge count={searchParams.getAll("handle")?.length} color="#000" />
        </Button>
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
            setSelectedFilter({ key: "style", name: "Stil" });
          }}
        >
          Stilul gentii
          <Badge count={searchParams.getAll("style")?.length} color="#000" />
        </Button>
      </div>
    </Flex>
  );
};

export default HorizontalFilters;
