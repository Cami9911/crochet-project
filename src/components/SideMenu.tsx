import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import "./SideMenu.scss";
import { useNavigate } from "react-router-dom";

// const items2: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

// const purses: TabsProps["purses"] = [
//   {
//     key: "/purse1",
//     label: "Geanta A",
//   },
//   {
//     key: "purse2",
//     label: "Geanta fundita",
//   },
//   {
//     key: "purse3",
//     label: "Geanta neagra",
//   },
// ];

// const berets: TabsProps["berets"] = [
//   {
//     key: "/adultsberets",
//     label: "Berete adulti",
//     src: beret1,
//   },
//   {
//     key: "/childrenberets",
//     label: "Berete copii",
//     src: beret2,
//   },
// ];

// const items: TabsProps["items"] = [
//   {
//     key: "/all",
//     label: "Toate produsele",
//   },
//   {
//     key: "/purses",
//     label: "Genti",
//     children: purses,
//   },
//   {
//     key: "/bags",
//     label: "Rucsace",
//   },
//   {
//     key: "/wallets",
//     label: "Portofele",
//   },
//   {
//     key: "/berets",
//     label: "Berete",
//     children: berets,
//   },
//   {
//     key: "/hats",
//     label: "Palarii",
//   },
// ];

const items: MenuProps["items"] = [
  {
    key: "/all",
    label: "Toate produsele",
  },
  {
    key: "/purses",
    label: "Genti",
    children: [
      {
        key: "/purse1",
        label: "Geanta A",
      },
      {
        key: "purse2",
        label: "Geanta fundita",
      },
      {
        key: "purse3",
        label: "Geanta neagra",
      },
    ],
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
    children: [
      {
        key: "/adultsberets",
        label: "Berete adulti",
        // you can handle image display separately in the content area
      },
      {
        key: "/childrenberets",
        label: "Berete copii",
      },
    ],
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
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["/all"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", backgroundColor: "rgb(237,234,230)" }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default SideMenu;
