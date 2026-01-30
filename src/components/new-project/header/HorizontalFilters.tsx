import React from "react";
import { Button, Flex } from "antd";

const HorizontalFilters: React.FC = () => (
  <Flex gap="small" wrap>
    <Button>Culoare</Button>
    <Button>Marimea posetei</Button>
    <Button>Tipul manerului gentii</Button>
    <Button>Tip de geanta</Button>
  </Flex>
);

export default HorizontalFilters;
