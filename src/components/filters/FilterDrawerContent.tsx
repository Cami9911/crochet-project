import { useAtomValue, useSetAtom } from "jotai";
import { selectedFilterAtom } from "../../storageAtoms";
import { Table, TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";
import SizeFilters from "./SIzeFilters";

interface filtersGridProps {
  resetColorsKey: number;
}

interface DataType {
  key: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
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

const data: DataType[] = [
  {
    key: "colors",
    name: "Culoare",
  },
  {
    key: "material",
    name: "Material",
  },
  {
    key: "size",
    name: "Dimensiune",
  },
  {
    key: "handle",
    name: "Tipul manerului gentii",
  },
  {
    key: "style",
    name: "Stil",
  },
  {
    key: "category",
    name: "Categorie",
  },
];

const FilterDrawerContent: React.FC<filtersGridProps> = ({
  resetColorsKey,
}) => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const selectedFilter = useAtomValue(selectedFilterAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectOneFilter = (record: DataType) => {
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
        <Table<DataType>
          className={"filter-grid"}
          columns={columns}
          dataSource={data}
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
      {selectedFilter.key === "colors" && (
        <ColorsFilter
          onToggleFilters={toggleFilters}
          resetKey={resetColorsKey}
        />
      )}
      {selectedFilter.key === "size" && (
        <SizeFilters
          onToggleFilters={toggleFilters}
          resetKey={resetColorsKey}
        />
      )}
    </>
  );
};
export default FilterDrawerContent;
