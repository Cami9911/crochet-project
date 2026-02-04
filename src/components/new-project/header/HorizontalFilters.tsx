import React from "react";
import { Button, Flex } from "antd";

const HorizontalFilters: React.FC = () => (
  <Flex
    gap="small"
    className="sticky z-900 bg-white-bg"
    style={{ top: "137px" }}
  >
    <div className="flex p-2 gap-4">
      <Button>Culoare</Button>
      <Button>Marimea posetei</Button>
      <Button>Tipul manerului gentii</Button>
      <Button>Tip de geanta</Button>
    </div>
  </Flex>
);

export default HorizontalFilters;
