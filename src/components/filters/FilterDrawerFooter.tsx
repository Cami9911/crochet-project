import { Button, Flex } from "antd";
import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router-dom";
import { selectedFiltersValuesAtom } from "../../storageAtoms";

type drawerFooterProps = {
  handleClose: () => void;
  setResetFiltersKey: React.Dispatch<React.SetStateAction<number>>;
};
const FilterDrawerFooter: React.FC<drawerFooterProps> = ({
  handleClose,
  setResetFiltersKey,
}) => {
  const selectedFiltersValues = useAtomValue(selectedFiltersValuesAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  const removeAllColors = () => {
    setResetFiltersKey((k) => k + 1);

    const next = new URLSearchParams(searchParams);
    next.delete("color");
    next.delete("size");
    setSearchParams(next);
  };

  const isFilterSelected = selectedFiltersValues.length > 0;
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
          Vezi
        </Button>
      )}
    </Flex>
  );
};
export default FilterDrawerFooter;
