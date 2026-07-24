import { useAtomValue } from "jotai";
import { searchInputValueAtom } from "../storageAtoms";
import { Flex } from "antd";

const NotFound = () => {
  const searchInputValue = useAtomValue(searchInputValueAtom);

  return (
    <Flex vertical className="text-black">
      <span>Nu există rezultate pentru "{searchInputValue}"</span>
      <span>
        Asigură-te că fraza tastată este corectă sau încearcă să introduci una
        diferită.
      </span>
    </Flex>
  );
};
export default NotFound;
