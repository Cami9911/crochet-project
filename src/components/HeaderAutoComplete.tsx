import React, { useMemo, useState } from "react";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";
import { products } from "../productData";

type OptionType = NonNullable<AutoCompleteProps["options"]>[number];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // "Cămașă" => "Camasa"
    .trim();

const HeaderAutoComplete: React.FC = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const indexedProducts = useMemo(() => {
    return products.map((product) => {
      const searchableFields = [
        product.category,
        product.color,
        product.size,
        ...product.similarColors,
        ...product.style,
        ...product.handle,
      ]
        .filter(Boolean)
        .map(normalize);

      return {
        ...product,
        searchableFields,
      };
    });
  }, []);

  const buildLabel = (product: (typeof products)[number]) => {
    return (
      <div className="flex flex-col py-1">
        <span className="font-medium">
          {product.category} - {product.color}
        </span>
        <span className="text-xs text-gray-500">
          marime: {product.size} | stil: {product.style.join(", ")}
        </span>
      </div>
    );
  };

  const onSearch = (searchText: string) => {
    if (searchText.length < 3) return;

    const normalizedSearch = normalize(searchText);

    if (!normalizedSearch) {
      setOptions([]);
      return;
    }

    // split(/\s+/) breaks a string into words using whitespace as the separator
    // filter(Boolean) removes “falsy” values from an array
    const keywords = normalizedSearch.split(/\s+/).filter(Boolean);

    const matches = indexedProducts
      .filter((product) =>
        keywords.every((keyword) =>
          product.searchableFields.some((field) => field.includes(keyword)),
        ),
      )
      .slice(0, 8)
      .map<OptionType>((product) => ({
        value: product.key,
        label: buildLabel(product),
      }));

    setOptions(matches);
  };

  const onSelect = (selectedValue: string) => {
    const selectedProduct = products.find(
      (product) => product.key === selectedValue,
    );

    if (selectedProduct) {
      setValue(`${selectedProduct.category} ${selectedProduct.color}`);
      console.log("Selected product:", selectedProduct);
    }
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <AutoComplete
      size="large"
      className="w-full"
      value={value}
      options={options}
      onSearch={onSearch}
      onSelect={onSelect}
      onChange={onChange}
      filterOption={false}
      placeholder="Cauta dupa culoare, stil, tipul de produs"
    />
  );
};

export default HeaderAutoComplete;
