import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isOpenedFilterDrawerAtom,
  openedFilterDrawerAtom,
  selectedFilterAtom,
} from "../../storageAtoms";
import FilterDrawerFooter from "./FilterDrawerFooter";
import FilterDrawerContent from "./FilterDrawerContent";
import { LeftOutlined } from "@ant-design/icons";

interface FilterDrawerProps {
  handleClose: () => void;
  open: boolean;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose }) => {
  const [resetColorsKey, setResetColorsKey] = useState(0);

  const openedFilterDrawer = useAtomValue(openedFilterDrawerAtom);
  const setOpenedFilterDrawer = useSetAtom(openedFilterDrawerAtom);

  const selectedFilter = useAtomValue(selectedFilterAtom);
  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const isOpenedFilterDrawer = useAtomValue(isOpenedFilterDrawerAtom);

  return (
    <Drawer
      title={
        <div className="drawer-header">
          {openedFilterDrawer !== "all-filters" && (
            <Button
              type="text"
              onClick={() => {
                setOpenedFilterDrawer("all-filters");
                setSelectedFilter({ key: "all-filters", name: "all-filters" });
              }}
              icon={<LeftOutlined />}
            ></Button>
          )}

          <span className="drawer-title">
            {selectedFilter.name === "all-filters"
              ? "Toate filtrele"
              : selectedFilter.name}
          </span>
        </div>
      }
      className={openedFilterDrawer === "all-filters" ? "filter-drawer" : ""}
      closable={{ "aria-label": "Close Button", placement: "end" }}
      onClose={handleClose}
      footer={
        <FilterDrawerFooter
          handleClose={handleClose}
          setResetColorsKey={setResetColorsKey}
        />
      }
      open={isOpenedFilterDrawer}
    >
      <FilterDrawerContent resetColorsKey={resetColorsKey} />
    </Drawer>
  );
};

export default FilterDrawer;
