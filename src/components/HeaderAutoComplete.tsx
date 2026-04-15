import React, { useMemo, useState } from "react";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";
import { products } from "../productData";
import { ro } from "../translations";
import { useNavigate } from "react-router-dom";
import { selectedProductAtom } from "../storageAtoms";
import { useSetAtom } from "jotai";

type OptionType = NonNullable<AutoCompleteProps["options"]>[number];

// Priority scores — higher = shown first in results
const MATCH_SCORE = {
  category: 100,
  color: 80,
  searchWords: 60,
  size: 40,
  style: 30,
  similarColors: 20,
  handle: 10,
};

const HeaderAutoComplete: React.FC = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const setSelectedProduct = useSetAtom(selectedProductAtom);

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // "Cămașă" => "Camasa"
      .trim();

  const searchableProducts = useMemo(() => {
    return products.map((product) => {
      const similarColors = product.similarColors.map(
        (color) => ro.colors[color] || color,
      );
      const handleTranslated = product.handle.map(
        (handle) => ro.handles[handle] || handle,
      );

      return {
        product,
        fields: {
          category: normalize(ro.categories[product.category] || ""),
          color: normalize(ro.colors[product.color] || ""),
          searchWords: (product.searchWords || []).map(normalize),
          size: normalize(ro.sizes[product.size] || ""),
          style: normalize(ro.styles[product.style] || ""),
          similarColors: similarColors.map(normalize),
          handle: handleTranslated.map(normalize),
        },
      };
    });
  }, []);

  const onChange = (searchValue: string) => {
    setValue(searchValue);

    const trimmed = searchValue.trim();

    if (trimmed.length <= 2) {
      setOptions([]);
      return;
    }

    // Split into individual words so "geanta verde" matches both fields separately
    const words = normalize(searchValue).split(/\s+/).filter(Boolean);

    const scored = searchableProducts
      .map(({ product, fields }) => {
        let score = 0;
        let allWordsMatched = true;

        for (const word of words) {
          let wordMatched = false;

          if (fields.category.includes(word)) {
            score += MATCH_SCORE.category;
            wordMatched = true;
          }
          if (fields.color.includes(word)) {
            score += MATCH_SCORE.color;
            wordMatched = true;
          }
          if (fields.searchWords.some((w) => w.includes(word))) {
            score += MATCH_SCORE.searchWords;
            wordMatched = true;
          }
          if (fields.size.includes(word)) {
            score += MATCH_SCORE.size;
            wordMatched = true;
          }
          if (fields.style.includes(word)) {
            score += MATCH_SCORE.style;
            wordMatched = true;
          }
          if (fields.similarColors.some((c) => c.includes(word))) {
            score += MATCH_SCORE.similarColors;
            wordMatched = true;
          }
          if (fields.handle.some((h) => h.includes(word))) {
            score += MATCH_SCORE.handle;
            wordMatched = true;
          }

          if (!wordMatched) {
            allWordsMatched = false;
            break;
          }
        }

        return { product, score: allWordsMatched ? score : 0 };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(
        ({ product }): OptionType => ({
          value: product.key,
          label: (
            <div className="flex flex-col py-1">
              <span className="font-medium">
                {ro.categories[product.category]} - {ro.colors[product.color]}
              </span>
              <span className="text-xs text-gray-500">
                marime: {ro.sizes[product.size]} | stil:{" "}
                {ro.styles[product.style]}
              </span>
            </div>
          ),
        }),
      );

    setOptions(scored);
  };

  const onSelect = (selectedValue: string) => {
    const newSelectedProduct =
      products.find((item) => item.key === selectedValue) ?? null;
    setSelectedProduct(newSelectedProduct);

    navigate(`/product-details/${selectedValue}`);
    setValue("");
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      size="large"
      className="w-full"
      onSelect={onSelect}
      onChange={onChange}
      placeholder="Search product"
    />
  );
};

export default HeaderAutoComplete;
