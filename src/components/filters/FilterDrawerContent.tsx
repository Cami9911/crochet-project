import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedFilterAtom,
  selectedFiltersValuesAtom,
} from "../../storageAtoms";
import { Table, TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";
import FiltersSelection from "./FiltersSelection";
import { filters, sizes, handles, styles } from "../filtersData";
import { FilterProps } from "../types";
import { useEffect } from "react";

interface FilterDrawerContentProps {
  resetFiltersKey: number;
}

const columns: TableProps<FilterProps>["columns"] = [
  {
    title: "",
    dataIndex: "name",
    key: "name",
    width: "85%",
    render: (text) => <span className="p-2">{text}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: () => <RightOutlined className="text-grey-icons!" />,
  },
];

const FilterDrawerContent: React.FC<FilterDrawerContentProps> = ({
  resetFiltersKey,
}) => {
  const selectedFilter = useAtomValue(selectedFilterAtom);
  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const setSelectedFiltersValues = useSetAtom(selectedFiltersValuesAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSelection = (filter: string, name: string) => {
    setSelectedFiltersValues((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );

    toggleFilters(filter, name);
  };

  const toggleFilters = (filter: string, paramName: string) => {
    const current = new Set(searchParams.getAll(filter)); //negru
    const next = new URLSearchParams(searchParams); //create a copy of all url params

    // remove all first, then re-add (easiest to keep clean)
    next.delete(filter);

    if (current.has(paramName)) current.delete(paramName);
    else current.add(paramName);

    // re-add to URL
    [...current].forEach((c) => next.append(filter, c));

    setSearchParams(next);
  };

  useEffect(() => {
    setSelectedFiltersValues([]);
  }, [resetFiltersKey, setSelectedFiltersValues]);

  return (
    <>
      {selectedFilter.key === "all-filters" && (
        <Table<FilterProps>
          className={"filter-grid"}
          columns={columns}
          dataSource={filters}
          pagination={false}
          showHeader={false}
          // rowClassName={(record) =>
          //   selectedRowKeys.includes(record.key) ? "selected-row" : ""
          // }
          onRow={(record) => ({
            onClick: () => {
              setSelectedFilter(record);
            },
          })}
        />
      )}
      {selectedFilter.key === "color" && (
        <ColorsFilter onToggleSelection={toggleSelection} />
      )}
      {selectedFilter.key === "size" && (
        <FiltersSelection
          onToggleSelection={toggleSelection}
          filtersData={sizes}
          keyToCheck="size"
        />
      )}
      {selectedFilter.key === "handle" && (
        <FiltersSelection
          onToggleSelection={toggleSelection}
          filtersData={handles}
          keyToCheck="handle"
        />
      )}
      {selectedFilter.key === "style" && (
        <FiltersSelection
          onToggleSelection={toggleSelection}
          filtersData={styles}
          keyToCheck="style"
        />
      )}
    </>
  );
};
export default FilterDrawerContent;
