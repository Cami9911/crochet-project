import { products } from "./productData";

const images = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../assets/${imageName}`];

const capitalizeFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const AllProducts = products.map((product) => ({
  ...product,
  label: `${product.category} · ${capitalizeFirst(product.color)}`,
  src: getImage(product.image),
}));

export default AllProducts;
