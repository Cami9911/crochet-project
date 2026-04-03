import React from "react";
import { Badge, Button, Flex } from "antd";
import { useSetAtom } from "jotai";
import { isOpenFilterDrawerAtom, selectedFilterAtom } from "../../storageAtoms";
import { useSearchParams } from "react-router-dom";
import { filters } from "./filtersData";

const HorizontalFilters: React.FC = () => {
  const setSelectedFilter = useSetAtom(selectedFilterAtom);
  const setIsOpenFilterDrawer = useSetAtom(isOpenFilterDrawerAtom);
  const [searchParams] = useSearchParams();

  return (
    <Flex
      gap="small"
      className="sticky z-900 bg-white-bg"
      style={{ top: "137px" }}
    >
      {/* // <Row
    //   gutter={16}
    //   className="sticky z-900 bg-white-bg w-full overflow-x-auto"
    //   style={{ top: "137px" }}
    //   wrap={false}
    // > */}
      <div className="hidden sm:flex pb-2 mb-2 gap-4 overflow-x-auto whitespace-nowrap lg:max-w-full min-[880px]:max-w-full min-[768px]:max-w-9/10 min-[640px]:max-w-sm min-[460px]:max-w-124 max-w-64">
        {filters.map(({ key, name }) => (
          // <Col className="mb-2 pb-2">
          <Button
            onClick={() => {
              setIsOpenFilterDrawer(true);
              setSelectedFilter({ key: key, name: name });
            }}
          >
            {name}
            <Badge count={searchParams.getAll(key)?.length} color="#000" />
          </Button>
          // </Col>
        ))}
      </div>
    </Flex>
    // </Row>
  );
};

export default HorizontalFilters;
