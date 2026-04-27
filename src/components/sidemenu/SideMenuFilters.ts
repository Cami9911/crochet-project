import { productType } from "../../types";

export const routeToFilter: Record<string, (p: productType) => boolean> = {
  "/": () => true,

  "/bags": (p) => p.category === "bag",

  "/backpacks": (p) => p.category === "backpack",
  "/wallets": (p) => p.category === "wallet",

  "/berets": (p) => p.category === "beret",
  "/berets-children": (p) => p.category === "beret", // if you have this field  && p.target === "copii"
  "/berets-adults": (p) => p.category === "beret",

  "/hats": (p) => p.category === "hat",
};
