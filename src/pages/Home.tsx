import { Flex } from "antd";
import SideMenu from "../components/sidemenu/SideMenu.tsx";
import HorizontalFilters from "../components/filters/HorizontalFilters.tsx";
import GridContent from "../components/GridContent.tsx";

const Home = () => {
  return (
    <Flex gap={"middle"} className="px-4! sm:px-2! md:px-12! xl:px-40!">
      <SideMenu></SideMenu>
      <Flex vertical>
        <HorizontalFilters />
        <GridContent />
      </Flex>
    </Flex>
  );
};

export default Home;
