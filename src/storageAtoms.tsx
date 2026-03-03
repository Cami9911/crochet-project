import { atomWithStorage } from "jotai/utils";

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
