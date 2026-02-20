import React, { useState } from "react";
import { Drawer } from "antd";
import { useAtomValue } from "jotai";
import { openedFilterDrawerAtom } from "../../storageAtoms";
import FilterDrawerFooter from "./FilterDrawerFooter";
import FilterDrawerContent from "./FilterDrawerContent";

interface FilterDrawerProps {
  handleClose: () => void;
  open: boolean;
}

interface DataType {
  key: string;
  name: string;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose, open }) => {
  const [resetColorsKey, setResetColorsKey] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<DataType>({
    key: "all-filters",
    name: "all-filters",
  });

  const openedFilterDrawer = useAtomValue(openedFilterDrawerAtom);

  return (
    <Drawer
      title={
        selectedFilter.name === "all-filters"
          ? "Toate filtrele"
          : selectedFilter.name
      }
      className={openedFilterDrawer === "all-filters" ? "filter-drawer" : ""}
      closable={{ "aria-label": "Close Button" }}
      onClose={handleClose}
      open={open}
      footer={
        <FilterDrawerFooter
          handleClose={handleClose}
          setResetColorsKey={setResetColorsKey}
        />
      }
    >
      <FilterDrawerContent
        resetColorsKey={resetColorsKey}
        setSelectedFilter={setSelectedFilter}
      />
    </Drawer>
  );
};

export default FilterDrawer;
