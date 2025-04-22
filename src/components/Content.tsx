import { Tabs, TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import GridImages from "./GridImages.tsx";
import "./Content.scss";
import allProducts from "./AllProductsData.tsx";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const tabitems: TabsProps["items"] = [
  {
    key: "all",
    label: "Toate produsele",
  },
  {
    key: "purse",
    label: "Genti",
  },
  {
    key: "bag",
    label: "Rucsace",
  },
  {
    key: "wallet",
    label: "Portofele",
  },
  {
    key: "beret",
    label: "Berete",
  },
  {
    key: "hat",
    label: "Palarii",
  },
];

const dropdownitems: MenuProps["items"] = [
  {
    key: "all",
    label: "Toate produsele",
  },
  {
    key: "all-purses",
    type: "group",
    label: "Genti",
    children: [
      { key: "purse", label: "Toate gentile" },
      { key: "purse-rose", label: "Genti Trandafir" },
      { key: "purse-eliza", label: "Genti Eliza" },
      { key: "purse-felicia", label: "Genti Felicia" },
      { key: "purse-andra", label: "Genti Andra" },
      { key: "purse-florina", label: "Genti Florina" },
      { key: "purse-roxen", label: "Genti Roxen" },
      { key: "purse-amalia", label: "Genti Amalia" },
      { key: "purse-sonia", label: "Genti Sonia" },
    ],
  },
  {
    key: "all-berets",
    type: "group",
    label: "Berete",
    children: [
      { key: "beret", label: "Toate beretele" },
      { key: "beret-adult", label: "Berete adulti" },
      { key: "beret-child", label: "Berete copii" },
    ],
  },
];

const ContentCmp = () => {
  const filterItems: MenuProps["onClick"] = (obj) => {
    const filteredAllitems = allProducts.filter((item) =>
      item.key.includes(obj.key)
    );
    setAllItems(filteredAllitems);
  };

  // useEffect(() => {
  //     const filtered = dropdownitems.filter((item) => {
  //         return item.key.includes('purses');
  //
  //     });
  //     setDropdownItems(filtered);

  // }, []);
  const onChange = (key: string) => {
    // set dropdown options for each tab
    const filteredDropdownOptions = dropdownitems.filter((item) =>
      item?.key?.toString().includes(key)
    );
    setDropdownItems(filteredDropdownOptions);
    setDropdownState(filteredDropdownOptions.length === 0);

    // set items for each tab
    const filteredTabItems = allProducts.filter((item) =>
      item.key.includes(key)
    );
    setAllItems(filteredTabItems);
  };

  const [dropdownState, setDropdownState] = useState(false);
  const [allTabsItems, setAllItems] = useState(allProducts);
  const [tabsItems] = useState(tabitems);
  const [dropdownItems, setDropdownItems] = useState(dropdownitems);

  return (
    <Content style={{ paddingTop: "60px" }}>
      <div className="content_cmp">
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          className="content_tab"
          items={tabsItems.map(({ key, label }) => ({
            key,
            label,
            children: <GridImages items={allTabsItems} />, // Replace with the content of each tab
          }))}
        ></Tabs>

        <Dropdown
          disabled={dropdownState}
          menu={{
            items: dropdownItems,
            onClick: filterItems,
          }}
        >
          <a className="content_dropdown" onClick={(e) => e.preventDefault()}>
            <Space>
              Categorii
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Content>
  );
};
export default ContentCmp;
