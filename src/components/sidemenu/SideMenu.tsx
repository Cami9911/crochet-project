import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import "./SideMenu.scss";
import { useLocation, useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "/",
    label: "Toate produsele",
  },
  {
    key: "/?category=bags",
    label: "Genți",
  },
  {
    key: "/?category=backpacks",
    label: "Ghiozdane",
  },
  {
    key: "/?category=shoes",
    label: "Pantofi",
  },
  {
    key: "/?category=sandals",
    label: "Sandale",
  },
  {
    key: "/?category=boots",
    label: "Ghete",
  },
  {
    key: "/?category=wallets",
    label: "Portofele",
  },
  {
    key: "/?category=berets",
    label: "Berete",
  },
  {
    key: "/?category=beanies",
    label: "Căciulițe copii",
  },
  {
    key: "/?category=hats",
    label: "Pălării",
  },
];

const SideMenu = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");

  const selectedKey = category ? `/?category=${category}` : "/";

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    // start from the params encoded in the menu key (category or nothing)
    const nextParams = new URLSearchParams(key.split("?")[1] ?? "");

    // carry over the current sort, if any
    const sort = searchParams.get("sort");
    if (sort) nextParams.set("sort", sort);

    const qs = nextParams.toString();
    navigate(qs ? `/?${qs}` : "/");
  };

  return (
    <Sider
      // width={200}
      className="hidden lg:block sider bg-white-bg"
      style={{
        position: "sticky",
        top: 137,
        alignSelf: "flex-start",
      }}
    >
      <Menu
        // mode="inline"
        className="side-menu pt-8 bg-white-bg border-0!"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={["/all"]}
        style={{ height: "100%" }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default SideMenu;
