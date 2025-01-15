import React from 'react';
import {Layout, Image} from 'antd';
import './Header.scss';
import Cover from "../assets/cover.jpg";

const {Content} = Layout;


const HeaderMenu = () => {
    return (
        <Content style={{ }}>
            <div>
            <Image
                className="header_image"
                src={Cover}
                preview={false}
            />
            </div>
            <p className="header_text">Stela's Crochet</p>

        </Content>
    )
};
export default HeaderMenu;
