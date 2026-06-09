import { productType } from "../../types";

export const routeToFilter: Record<string, (p: productType) => boolean> = {
  "/": () => true,

  "/bags": (p) => p.category === "bags",

  "/backpacks": (p) => p.category === "backpacks",
  "/wallets": (p) => p.category === "wallets",
  "/shoes": (p) => p.category === "shoes",
  "/sandals": (p) => p.category === "sandals",
  "/boots": (p) => p.category === "boots",
  "/berets": (p) => p.category === "berets",
  "/berets-children": (p) => p.category === "berets", // if you have this field  && p.target === "copii"
  "/berets-adults": (p) => p.category === "berets",
  "/beanies": (p) => p.category === "beanies",

  "/hats": (p) => p.category === "hats",
};
