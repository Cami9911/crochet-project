export interface Product {
  key: string;
  category: string;
  color: string;
  size: string;
  material: string;
  handle: string;
  style: string;
  image: string;
}

export const routeToFilter: Record<string, (p: Product) => boolean> = {
  "/all": () => true,

  "/bags": (p) => p.category === "Geanta",
  "/bags-elegante": (p) => p.category === "Geanta" && p.style === "elegante",
  "/bags-casual": (p) => p.category === "Geanta" && p.style === "casual",

  "/backpacks": (p) => p.category === "Rucsac",
  "/wallets": (p) => p.category === "Portofel",

  "/berets": (p) => p.category === "Bereta",
  "/berets-children": (p) => p.category === "Bereta", // if you have this field  && p.target === "copii"
  "/berets-adults": (p) => p.category === "Bereta",

  "/hats": (p) => p.category === "Palarie",
};
