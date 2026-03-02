import React, { useState } from "react";
import { Badge, Button, Drawer } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import { isOpenFilterDrawerAtom, selectedFilterAtom } from "../../storageAtoms";
import FilterDrawerFooter from "./FilterDrawerFooter";
import FilterDrawerContent from "./FilterDrawerContent";
import { LeftOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

interface FilterDrawerProps {
  handleClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleClose }) => {
  const [resetFiltersKey, setResetFiltersKey] = useState(0);

  const selectedFilter = useAtomValue(selectedFilterAtom);
  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const isOpenFilterDrawer = useAtomValue(isOpenFilterDrawerAtom);

  const [searchParams] = useSearchParams();

  const selectionCount = searchParams.getAll(selectedFilter.key).length;

  return (
    <Drawer
      title={
        <div className="drawer-header flex">
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
          <div>
            <span className="drawer-title mr-2">
              {selectedFilter.name === "all-filters"
                ? "Toate filtrele"
                : selectedFilter.name}
            </span>
            {selectedFilter.name === "all-filters" ? (
              <Badge count={searchParams.size} color="#000" />
            ) : (
              <Badge count={selectionCount} color="#000" />
            )}
          </div>
        </div>
      }
      className={selectedFilter.name === "all-filters" ? "filter-drawer" : ""}
      closable={{ "aria-label": "Close Button", placement: "end" }}
      onClose={handleClose}
      footer={
        <FilterDrawerFooter
          handleClose={handleClose}
          setResetFiltersKey={setResetFiltersKey}
        />
      }
      open={isOpenFilterDrawer}
    >
      <FilterDrawerContent resetFiltersKey={resetFiltersKey} />
    </Drawer>
  );
};

export default FilterDrawer;
