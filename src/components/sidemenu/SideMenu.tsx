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
    key: "/bags",
    label: "Genti",
  },
  {
    key: "/backpacks",
    label: "Rucsace",
  },
  {
    key: "/shoes",
    label: "Pantofi",
  },
  {
    key: "/sandals",
    label: "Sandale",
  },
  {
    key: "/boots",
    label: "Ghete",
  },
  {
    key: "/wallets",
    label: "Portofele",
  },
  {
    key: "/berets",
    label: "Berete",
  },
  {
    key: "/beanies",
    label: "Caciulite copii",
  },
  {
    key: "/hats",
    label: "Palarii",
  },
];

const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
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
        selectedKeys={[pathname]}
        defaultOpenKeys={["/all"]}
        style={{ height: "100%" }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default SideMenu;
