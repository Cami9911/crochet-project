import {Content} from "antd/es/layout/layout";
import {Layout, Tabs, TabsProps} from "antd";
import React from "react";
import HeaderMenu from "../components/Header.tsx";
import SideMenu from "../components/SideMenu.tsx";
import ContentCmp from "../components/Content.tsx";
import FooterCmp from "../components/Footer.tsx";
import GridImages from "../components/GridImages.tsx";
import {Route, Routes} from "react-router-dom";

import purse1 from "../assets/purse1.jpg";
import purse2 from "../assets/purse2.jpg";
import purse3 from "../assets/purse3.jpeg";
import purse4 from "../assets/purse4.jpeg";
import purse5 from "../assets/purse5.png";
import purse6 from "../assets/purse6.jpg";
import purse7 from "../assets/purse7.jpg";
import purse8 from "../assets/purse8.jpg";
import bag from "../assets/bag.jpg";
import wallet1 from "../assets/wallet1.jpg";
import wallet2 from "../assets/wallet2.jpg";
import wallet3 from "../assets/wallet3.jpg";
import wallet4 from "../assets/wallet4.jpg";
import wallet5 from "../assets/wallet5.jpg";
import beret1 from "../assets/beret1.jpg";
import beret2 from "../assets/beret2.jpg";
import beret3 from "../assets/beret3.jpg";
import beret4 from "../assets/beret4.jpg";
import beret5 from "../assets/beret5.jpg";
import hat1 from "../assets/hat1.jpg";
import hat2 from "../assets/hat2.jpg";
import hat3 from "../assets/hat3.jpg";
import hat4 from "../assets/hat4.jpg";
import hat5 from "../assets/hat5.jpg";
import hat6 from "../assets/hat6.jpg";

const purses: TabsProps['purses'] = [
    {
        key: '1',
        label: 'Geanta neagra',
        src: purse1,
    },
    {
        key: '2',
        label: 'Geanta fundita',
        src: purse2,
    },
    {
        key: '3',
        label: 'Geanta neagra',
        src: purse3,
    },
    {
        key: '5',
        label: 'Geanta roz',
        src: purse4,
    },
    {
        key: '6',
        label: 'Geanta roz',
        src: purse5,
    },
    {
        key: '7',
        label: 'Geanta roz',
        src: purse6,
    },
    {
        key: '8',
        label: 'Geanta roz',
        src: purse7,
    },
    {
        key: '9',
        label: 'Geanta roz',
        src: purse8,
    },
];

const bags: TabsProps['bags'] = [
    {
        key: '1',
        label: 'Rucsac',
        src: bag,
    },
];

const wallets: TabsProps['purses'] = [
    {
        key: '1',
        label: 'Geanta neagra',
        src: wallet1,
    },
    {
        key: '2',
        label: 'Geanta neagra',
        src: wallet2,
    },
    {
        key: '3',
        label: 'Geanta neagra',
        src: wallet3,
    },
    {
        key: '4',
        label: 'Geanta roz',
        src: wallet4,
    },
    {
        key: '5',
        label: 'Geanta roz',
        src: wallet5,
    },
];

const adultsBerets: TabsProps['berets'] = [
    {
        key: '1',
        label: 'Bereta neagra',
        src: beret1,
    },
    {
        key: '2',
        label: 'Bereta verde',
        src: beret2,
    },
    {
        key: '3',
        label: 'Bereta albastra',
        src: beret3,
    },
    {
        key: '4',
        label: 'Bereta gri',
        src: beret4,
    },
];

const childrenBerets: TabsProps['berets'] = [
    {
        key: '5',
        label: 'Bereta rosie',
        src: beret5,
    },
];

const hats: TabsProps['hats'] = [
    {
        key: '1',
        label: 'Palarie neagra',
        src: hat1,
    },
    {
        key: '2',
        label: 'Palarie verde',
        src: hat2,
    },
    {
        key: '3',
        label: 'Palarie albastra',
        src: hat3,
    },
    {
        key: '4',
        label: 'Palarie gri',
        src: hat4,
    },
    {
        key: '5',
        label: 'Palarie rosie',
        src: hat5,
    },
    {
        key: '6',
        label: 'Palarie roz',
        src: hat6,
    },
];
const Home = () => {
    return (
        <Layout>
            <HeaderMenu></HeaderMenu>
            <Layout>
                {/*<SideMenu></SideMenu>*/}
                {/*<Routing/>*/}
                <ContentCmp></ContentCmp>
            </Layout>
            <FooterCmp></FooterCmp>
        </Layout>
    );
};

function Routing() {
    return (
        <>
            <Routes>
                {/*<Route element={<PrivateRoutes/>}>*/}
                <Route path="/purse1" element={<GridImages items={purses}/>}/>
                <Route path="/hats" element={<GridImages items={hats}/>}/>
                <Route path="/bags" element={<GridImages items={bags}/>}/>
                <Route path="/wallets" element={<GridImages items={wallets}/>}/>
                <Route path="/adultsberets" element={<GridImages items={adultsBerets}/>}/>
                <Route path="/childrenberets" element={<GridImages items={childrenBerets}/>}/>
                {/*</Route>*/}
            </Routes>
        </>
    );
}
export default Home;