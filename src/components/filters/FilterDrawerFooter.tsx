import { Button, Flex } from "antd";
import { useSearchParams } from "react-router-dom";

type drawerFooterProps = {
  handleClose: () => void;
  setResetFiltersKey: React.Dispatch<React.SetStateAction<number>>;
};
const FilterDrawerFooter: React.FC<drawerFooterProps> = ({
  handleClose,
  setResetFiltersKey,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const removeAllColors = () => {
    setResetFiltersKey((k) => k + 1);

    const next = new URLSearchParams(searchParams);
    next.delete("color");
    next.delete("size");
    setSearchParams(next);
  };

  return (
    <Flex gap="middle" justify="flex-end">
      <Button
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
      <Button
        type="primary"
        styles={{ root: { backgroundColor: "#171717" } }}
        onClick={() => handleClose()}
      >
        Vezi
      </Button>
    </Flex>
  );
};
export default FilterDrawerFooter;
