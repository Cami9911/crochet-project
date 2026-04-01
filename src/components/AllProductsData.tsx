import { products } from "../productData";

const images = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,jfif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImage = (imageName: string) => images[`../assets/${imageName}`];

const AllProducts = products.map((product) => ({
  ...product,
  src: getImage(product?.firstImage),
}));

export default AllProducts;
