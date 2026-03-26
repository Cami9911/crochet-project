import { atomWithStorage } from "jotai/utils";
import { productType } from "./types";

export const selectedFilterAtom = atomWithStorage("selectedFilter", {
  key: "all-filters",
  name: "all-filters",
});

export const isOpenFilterDrawerAtom = atomWithStorage(
  "isOpenFilterDrawer",
  false,
);
export const isOpenSorterDrawerAtom = atomWithStorage(
  "isOpenSorterDrawer",
  false,
);

export const totalResultsAtom = atomWithStorage<number>("totalResults", 0);

export const urlHoverImageAtom = atomWithStorage<string>("urlHoverImage", "");

export const selectedProductAtom = atomWithStorage<productType | null>(
  "selectedProduct",
  null,
);

export const selectedColorAtom = atomWithStorage<string | undefined>(
  "selectedColor",
  "",
);
