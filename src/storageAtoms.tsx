import { atomWithStorage } from "jotai/utils";

export const openedFilterDrawerAtom = atomWithStorage(
  "openedFilterDrawer",
  "all-filters",
);

export const selectedFilterAtom = atomWithStorage("selectedFilter", {
  key: "all-filters",
  name: "all-filters",
});

export const isOpenedFilterDrawerAtom = atomWithStorage(
  "isOpenFilterDrawer",
  false,
);
export const isOpenedSorterDrawerAtom = atomWithStorage(
  "isOpenSorterDrawer",
  false,
);
