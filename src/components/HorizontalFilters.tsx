import React from "react";
import { Button, Flex } from "antd";

const HorizontalFilters: React.FC = () => (
  <Flex
    gap="small"
    className="sticky z-900 bg-white-bg"
    style={{ top: "137px" }}
  >
    <div className="hidden sm:flex pb-2 mb-2 gap-4 overflow-x-auto whitespace-nowrap lg:max-w-full min-[880px]:max-w-full min-[768px]:max-w-md min-[640px]:max-w-sm min-[460px]:max-w-124 max-w-64">
      <Button>Culoare</Button>
      <Button>Marimea posetei</Button>
      <Button>Material</Button>
      <Button>Tipul manerului gentii</Button>
      <Button>Tip de geanta</Button>
    </div>
  </Flex>
);

export default HorizontalFilters;
