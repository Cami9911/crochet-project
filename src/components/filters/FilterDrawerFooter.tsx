import { Badge, Button, Flex } from "antd";
import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router-dom";
import { selectedFilterAtom, totalResultsAtom } from "../../storageAtoms";
import { filters } from "./filtersData";

type drawerFooterProps = {
  handleClose: () => void;
};
const FilterDrawerFooter: React.FC<drawerFooterProps> = ({ handleClose }) => {
  const selectedFilter = useAtomValue(selectedFilterAtom);
  const totalResults = useAtomValue(totalResultsAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  const removeAllColors = () => {
    const next = new URLSearchParams(searchParams);

    if (selectedFilter.key === "all-filters") {
      filters.forEach((value) => next.delete(value.key));
    } else {
      next.delete(selectedFilter.key);
    }
    setSearchParams(next);
  };

  const isFilterSelected = searchParams.size > 0;
  return (
    <Flex gap="middle" justify="flex-end">
      {!isFilterSelected && (
        <Button
          type="primary"
          className="w-full"
          styles={{ root: { backgroundColor: "#171717" } }}
          onClick={() => handleClose()}
        >
          Inapoi la produse
        </Button>
      )}
      {isFilterSelected && (
        <Button
          className="w-full"
          onClick={() => removeAllColors()}
          styles={{
            root: {
              borderColor: "#ccc",
              color: "#171717",
              backgroundColor: "#fff",
            },
          }}
        >
          Eliminare
        </Button>
      )}
      {isFilterSelected && (
        <Button
          className="w-full"
          type="primary"
          styles={{ root: { backgroundColor: "#171717" } }}
          onClick={() => handleClose()}
        >
          Vezi <Badge count={totalResults} />
        </Button>
      )}
    </Flex>
  );
};
export default FilterDrawerFooter;
