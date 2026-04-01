export type FilterProps = {
  name: string;
  key: string;
};

export type productType = {
  key: string;
  category: string;
  color: string;
  similarColors: string[];
  size: string;
  material: string;
  handle: string;
  style: string;
  firstImage: string;
  secondImage: string;
  images: string[];
  description?: DescriptionItem;
  materials?: string;
  stock: boolean;
};

type DescriptionItem = {
  generalDescription: string;
  length: number;
  width: number;
  height: number;
  accesorii: string;
};

export type ProductInfoProps = {
  setSelectedProduct: React.Dispatch<React.SetStateAction<productType>>;
  selectedProduct: productType;
};

export type ProductImagesProps = {
  selectedProduct: productType;
};
