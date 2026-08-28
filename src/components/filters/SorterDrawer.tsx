import React from "react";
import { Drawer, Table, TableProps } from "antd";
import "./Drawer.scss";
import { isOpenSorterDrawerAtom, selectedSorterAtom } from "../../storageAtoms";
import { useAtom, useAtomValue } from "jotai";
import { CheckOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

interface SorterDrawerProps {
  handleClose: () => void;
}

interface DataType {
  key: string;
  name: string;
}

const data: DataType[] = [
  {
    key: "default",
    name: "Implicit",
  },
  {
    key: "newest",
    name: "Cele mai noi",
  },
  {
    key: "oldest",
    name: "Cele mai vechi",
  },
];

const SorterDrawer: React.FC<SorterDrawerProps> = ({ handleClose }) => {
  const isOpenedSorterDrawer = useAtomValue(isOpenSorterDrawerAtom);
  const [selectedSorter, setSelectedSorter] = useAtom(selectedSorterAtom);
  const [, setSearchParams] = useSearchParams();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "selection",
      width: "59px",
      render: (a) => {
        if (a.key !== selectedSorter) return;
        return (
          <div>
            <CheckOutlined />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Drawer
        title="Sortare"
        closable={{ "aria-label": "Close Button", placement: "end" }}
        onClose={handleClose}
        open={isOpenedSorterDrawer}
        placement="bottom"
        className="sorter-drawer"
      >
        <Table<DataType>
          className={"sorter-grid"}
          columns={columns}
          dataSource={data}
          pagination={false}
          showHeader={false}
          onRow={(record) => ({
            onClick: () => {
              setSelectedSorter(record.key);
              setSearchParams(
                (prev) => {
                  if (record.key === "default") {
                    prev.delete("sort");
                  } else {
                    prev.set("sort", record.key);
                  }
                  return prev;
                },
                { replace: true },
              );
            },
          })}
        />
      </Drawer>
    </>
  );
};

export default SorterDrawer;
