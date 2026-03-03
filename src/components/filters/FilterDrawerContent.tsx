import { useAtomValue, useSetAtom } from "jotai";
import { selectedFilterAtom } from "../../storageAtoms";
import { Badge, Table, TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";
import FiltersSelection from "./FiltersSelection";
import { filters, sizes, handles, styles } from "../filtersData";
import { FilterProps } from "../types";

const FilterDrawerContent: React.FC = () => {
  const selectedFilter = useAtomValue(selectedFilterAtom);
  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const [searchParams, setSearchParams] = useSearchParams();

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

  const columns: TableProps<FilterProps>["columns"] = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "85%",
      render: (_, value) => {
        const selectionCount = searchParams.getAll(value.key).length;
        return (
          <div>
            <span className="p-2">{value.name}</span>
            <Badge count={selectionCount} color="#000" />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => <RightOutlined className="text-grey-icons!" />,
    },
  ];

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
        <ColorsFilter onToggleSelection={toggleFilters} />
      )}
      {selectedFilter.key === "size" && (
        <FiltersSelection
          onToggleSelection={toggleFilters}
          filtersData={sizes}
          keyToCheck="size"
        />
      )}
      {selectedFilter.key === "handle" && (
        <FiltersSelection
          onToggleSelection={toggleFilters}
          filtersData={handles}
          keyToCheck="handle"
        />
      )}
      {selectedFilter.key === "style" && (
        <FiltersSelection
          onToggleSelection={toggleFilters}
          filtersData={styles}
          keyToCheck="style"
        />
      )}
    </>
  );
};
export default FilterDrawerContent;
