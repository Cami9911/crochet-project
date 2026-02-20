import { atomWithStorage } from "jotai/utils";

export const openedFilterDrawerAtom = atomWithStorage(
  "openedFilterDrawer",
  "all-filters",
);
