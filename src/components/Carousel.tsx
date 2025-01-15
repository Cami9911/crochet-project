import React from 'react';
import {Card, Carousel, Image, Modal} from 'antd';
import purse1 from "../assets/purse1.jpg";
import purse2 from "../assets/purse2.jpg";
import purse5 from "../assets/purse5.png";
import purse3 from "../assets/purse3.jpeg";
import purse4 from "../assets/purse4.jpeg";
import Meta from "antd/es/card/Meta";

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


const CarouselCmp: React.FC = (items) => (
    <Carousel autoplay arrows inifinite={false}>
        <div>
            {items.items?.map(({ src, key }) => {
                return <Image
                    src = {src}
                    key={key}
                >


                </Image>
            })}
        </div>
    </Carousel>
);

export default CarouselCmp;