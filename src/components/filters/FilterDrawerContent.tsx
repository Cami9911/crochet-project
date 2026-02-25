import { useAtomValue, useSetAtom } from "jotai";
import { selectedFilterAtom } from "../../storageAtoms";
import { Table, TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";
import FiltersSelection from "./FiltersSelection";
import { filters, sizes, handles, styles } from "../filtersData";
import { FilterProps } from "../types";

interface FilterDrawerContentProps {
  resetColorsKey: number;
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
  resetColorsKey,
}) => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const selectedFilter = useAtomValue(selectedFilterAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectOneFilter = (record: FilterProps) => {
    console.log(record);
    setSelectedFilter(record);
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
              selectOneFilter(record);
            },
          })}
        />
      )}
      {selectedFilter.key === "color" && (
        <ColorsFilter
          onToggleFilters={toggleFilters}
          resetKey={resetColorsKey}
        />
      )}
      {selectedFilter.key === "size" && (
        <FiltersSelection
          onToggleFilters={toggleFilters}
          resetKey={resetColorsKey}
          filtersData={sizes}
          keyToCheck="size"
        />
      )}
      {selectedFilter.key === "handle" && (
        <FiltersSelection
          onToggleFilters={toggleFilters}
          resetKey={resetColorsKey}
          filtersData={handles}
          keyToCheck="handle"
        />
      )}
      {selectedFilter.key === "style" && (
        <FiltersSelection
          onToggleFilters={toggleFilters}
          resetKey={resetColorsKey}
          filtersData={styles}
          keyToCheck="style"
        />
      )}
    </>
  );
};
export default FilterDrawerContent;
