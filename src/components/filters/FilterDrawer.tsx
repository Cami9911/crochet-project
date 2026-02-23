import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import { isOpenFilterDrawerAtom, selectedFilterAtom } from "../../storageAtoms";
import FilterDrawerFooter from "./FilterDrawerFooter";
import FilterDrawerContent from "./FilterDrawerContent";
import { LeftOutlined } from "@ant-design/icons";

interface FilterDrawerProps {
  handleClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose }) => {
  const [resetColorsKey, setResetColorsKey] = useState(0);

  const selectedFilter = useAtomValue(selectedFilterAtom);
  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const isOpenFilterDrawer = useAtomValue(isOpenFilterDrawerAtom);

  return (
    <Drawer
      title={
        <div className="drawer-header">
          {selectedFilter.name !== "all-filters" && (
            <Button
              type="text"
              className="text-grey-icons! -ml-2 max-h-6"
              onClick={() => {
                setSelectedFilter({ key: "all-filters", name: "all-filters" });
              }}
              icon={<LeftOutlined />}
            ></Button>
          )}

          <span className="drawer-title ">
            {selectedFilter.name === "all-filters"
              ? "Toate filtrele"
              : selectedFilter.name}
          </span>
        </div>
      }
      className={selectedFilter.name === "all-filters" ? "filter-drawer" : ""}
      closable={{ "aria-label": "Close Button", placement: "end" }}
      onClose={handleClose}
      footer={
        <FilterDrawerFooter
          handleClose={handleClose}
          setResetColorsKey={setResetColorsKey}
        />
      }
      open={isOpenFilterDrawer}
    >
      <FilterDrawerContent resetColorsKey={resetColorsKey} />
    </Drawer>
  );
};

export default FilterDrawer;
