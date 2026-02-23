import { useAtomValue, useSetAtom } from "jotai";
import { openedFilterDrawerAtom, selectedFilterAtom } from "../../storageAtoms";
import { Table, TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ColorsFilter from "./ColorsFilter";
import { useSearchParams } from "react-router-dom";

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
  },
  {
    title: "Action",
    key: "action",
    render: () => <RightOutlined />,
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
    key: "3",
    name: "Dimensiune",
  },
  {
    key: "4",
    name: "Tipul manerului gentii",
  },
  {
    key: "5",
    name: "Stil",
  },
  {
    key: "6",
    name: "Categorie",
  },
];

const FilterDrawerContent: React.FC<filtersGridProps> = ({
  resetColorsKey,
}) => {
  const setOpenedFilterDrawer = useSetAtom(openedFilterDrawerAtom);
  const openedFilterDrawer = useAtomValue(openedFilterDrawerAtom);

  const setSelectedFilter = useSetAtom(selectedFilterAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectOneFilter = (record: DataType) => {
    console.log(record);
    setSelectedFilter(record);
    setOpenedFilterDrawer(record.key);
  };

  const toggleColors = (colorName: string) => {
    const current = new Set(searchParams.getAll("color")); //negru
    const next = new URLSearchParams(searchParams); //create a copy of all url params

    // remove all first, then re-add (easiest to keep clean)
    next.delete("color");

    if (current.has(colorName)) current.delete(colorName);
    else current.add(colorName);

    // re-add to URL
    [...current].forEach((c) => next.append("color", c));

    setSearchParams(next);
  };

  return (
    <>
      {openedFilterDrawer === "all-filters" && (
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
      {openedFilterDrawer === "colors" && (
        <ColorsFilter onToggleColors={toggleColors} resetKey={resetColorsKey} />
      )}
    </>
  );
};
export default FilterDrawerContent;
