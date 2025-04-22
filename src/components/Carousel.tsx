import React from "react";
import { Carousel, Image } from "antd";

interface CarouselItem {
  src: string;
  key: string;
}

interface CarouselCmpProps {
  items: CarouselItem[];
}

const CarouselCmp: React.FC<CarouselCmpProps> = ({ items }) => (
  <Carousel autoplay arrows infinite={false}>
    <div>
      {items?.map(({ src, key }) => {
        return <Image src={src} key={key}></Image>;
      })}
    </div>
  </Carousel>
);

export default CarouselCmp;
