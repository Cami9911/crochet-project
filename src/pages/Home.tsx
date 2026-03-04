import { Flex } from "antd";
import SideMenu from "../components/SideMenu.tsx";
import HorizontalFilters from "../components/HorizontalFilters.tsx";
import GridContent from "../components/GridContent.tsx";

const Home = () => {
  return (
    <Flex gap={"middle"}>
      <SideMenu></SideMenu>
      <Flex vertical>
        <HorizontalFilters />
        <GridContent />
      </Flex>
    </Flex>
  );
};

export default Home;
