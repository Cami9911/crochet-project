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
    key: "/purses",
    label: "Genti elegante",
  },
  {
    key: "/purses",
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
    key: "/berets",
    label: "Berete copii",
  },
  {
    key: "/berets",
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
    <Sider width={200} className="hidden sm:block sider bg-[#f5f5f5]">
      <Menu
        // mode="inline"
        className="side-menu pt-8 bg-[#f5f5f5]"
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
