export type FilterProps = {
  name: string;
  key: string;
};

export type productType = {
  key: string;
  category: string;
  color: string;
  size: string;
  material: string;
  handle: string;
  style: string;
  firstImage: string;
  secondImage: string;
  images: string[];
  description?: DescriptionItem;
  materials?: string;
};

type DescriptionItem = {
  generalDescription: string;
  length: number;
  width: number;
  height: number;
  accesorii: string;
};
