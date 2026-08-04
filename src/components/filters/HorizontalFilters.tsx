import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Flex, Select } from "antd";
import { useSetAtom } from "jotai";
import { isOpenFilterDrawerAtom, selectedFilterAtom } from "../../storageAtoms";
import { useSearchParams } from "react-router-dom";
import { filters } from "./filtersData";

const HorizontalFilters: React.FC = () => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const setIsOpenFilterDrawer = useSetAtom(isOpenFilterDrawerAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const filtersRef = useRef<HTMLDivElement>(null);

  const [sortValue, setSortValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const header = document.getElementById("main-header");
    if (header && filtersRef.current) {
      const { height } = header.getBoundingClientRect();
      filtersRef.current.style.top = `${height}px`;
    }
  }, []);

  return (
    <Flex ref={filtersRef} gap="small" className="sticky z-900 bg-white-bg">
      <div className="hidden ml-3 lg:ml-0 sm:flex pb-2 mb-2 gap-4 overflow-x-auto whitespace-nowrap lg:max-w-full min-[880px]:max-w-full min-[768px]:max-w-9/10 min-[640px]:max-w-sm min-[460px]:max-w-124 max-w-64">
        <Select
          placeholder="Sorteaza"
          style={{ width: 120 }}
          value={sortValue}
          onChange={(value) => {
            if (value === "default") {
              setSortValue(undefined);
              searchParams.delete("sort");
            } else {
              setSortValue(value);
              searchParams.set("sort", value);
            }
            setSearchParams(searchParams);
          }}
          options={[
            { value: "default", label: "Implicit" },
            { value: "newest", label: "Cele mai noi" },
          ]}
        />
        {/* <Divider vertical /> */}
        {filters.map(({ key, name }) => {
          return (
            <Button
              key={key}
              onClick={() => {
                setIsOpenFilterDrawer(true);
                setSelectedFilter({ key: key, name: name });
              }}
            >
              {name}
              <Badge count={searchParams.getAll(key)?.length} color="#000" />
            </Button>
          );
        })}
      </div>
    </Flex>
  );
};

export default HorizontalFilters;
