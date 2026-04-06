import React, { useState } from "react";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const HeaderAutoComplete: React.FC = () => {
  const [value, setValue] = useState("");
  const [anotherOptions, setAnotherOptions] = useState<
    AutoCompleteProps["options"]
  >([]);

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        size="large"
        className="w-full"
        value={value}
        showSearch={{
          onSearch: (text) => setAnotherOptions(getPanelValue(text)),
        }}
        options={anotherOptions}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="Cauta dupa culoare, stil, tipul de produs"
      />
    </>
  );
};

export default HeaderAutoComplete;
