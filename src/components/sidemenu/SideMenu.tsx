import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import "./SideMenu.scss";
import { useNavigate } from "react-router-dom";

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
    key: "/bags-elegante",
    label: "Genti elegante",
  },
  {
    key: "/bags-casual",
    label: "Genti casual",
  },
  {
    key: "/backpacks",
    label: "Rucsace",
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
    key: "/berets-children",
    label: "Berete copii",
  },
  {
    key: "/berets-adults",
    label: "Berete adulti",
  },
  {
    key: "/hats",
    label: "Palarii",
  },
];

const SideMenu = () => {
  const navigate = useNavigate();

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
        defaultSelectedKeys={["/all"]}
        defaultOpenKeys={["/all"]}
        style={{ height: "100%" }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default SideMenu;
