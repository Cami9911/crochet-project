import { CheckOutlined } from "@ant-design/icons";
import { FilterProps, productType } from "../../types";
import { useSearchParams } from "react-router-dom";
import { products } from "../../productData";
import { Tag } from "antd";

type FiltersSelectionProps = {
  onToggleSelection: (filter: string, name: string) => void;
  filtersData: FilterProps[];
  keyToCheck: string;
};

const FiltersSelection: React.FC<FiltersSelectionProps> = ({
  onToggleSelection,
  filtersData,
  keyToCheck,
}) => {
  const [searchParams] = useSearchParams();

  const getResultsLength = (key: string) => {
    return products.filter((p) => p[keyToCheck as keyof productType] === key)
      .length;
  };

  return (
    <div className="flex flex-col">
      {filtersData.map(({ name, key }) => {
        const isChecked = searchParams.getAll(keyToCheck).includes(key);
        const resultsLength = getResultsLength(key);
        return (
          <div
            key={key}
            className="flex items-center justify-between py-3 px-6 hover:bg-gray-50 cursor-pointer -mx-6"
            onClick={() => onToggleSelection(keyToCheck, key)}
          >
            <div className="">
              <span className="mr-2">{name}</span>
              <Tag variant="outlined">{resultsLength}</Tag>
            </div>
            {isChecked && <CheckOutlined />}
          </div>
        );
      })}
    </div>
  );
};

export default FiltersSelection;
