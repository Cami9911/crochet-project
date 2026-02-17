import React from "react";
import { Drawer, Space, Table, TableProps } from "antd";
import "./Drawer.scss";

interface SorterDrawerProps {
  handleClose: () => void;
  open: boolean;
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
    render: () => (
      <Space size="middle">
        <a>Select</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Implicit",
  },
  {
    key: "2",
    name: "Cele mai noi",
  },
];

const SorterDrawer: React.FC<SorterDrawerProps> = ({ handleClose, open }) => {
  return (
    <>
      <Drawer
        title="Sortare"
        closable={{ "aria-label": "Close Button" }}
        onClose={handleClose}
        open={open}
        className="sorter-drawer"
      >
        <Table<DataType>
          className={"sorter-grid"}
          columns={columns}
          dataSource={data}
          pagination={false}
          showHeader={false}
        />
      </Drawer>
    </>
  );
};

export default SorterDrawer;
