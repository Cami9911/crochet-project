import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import "./SideMenu.scss";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "/all",
    label: "Toate produsele",
  },
  {
    key: "/purses",
    label: "Genti",
  },
  {
    key: "/purses-elegant",
    label: "Genti elegante",
  },
  {
    key: "/purses-casual",
    label: "Genti casual",
  },
  {
    key: "/bags",
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
      className="hidden sm:block sider bg-white-bg"
      style={{
        position: "sticky",
        top: 136,
        alignSelf: "flex-start",
        height: `calc(100vh - 80px)`,
        overflow: "auto",
      }}
    >
      <Menu
        // mode="inline"
        className="side-menu pt-8 bg-white-bg"
        defaultSelectedKeys={["/all"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default SideMenu;
