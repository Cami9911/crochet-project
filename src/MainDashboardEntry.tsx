import { ConfigProvider, Divider, Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import FooterCmp from "./components/Footer";
import ProductDetails from "./pages/productDetails/ProductDetails";

const MainDashboardEntry = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#a06518",
          colorLink: "#a06518",
          /* here is your global tokens */
        },
        components: {
          Menu: {
            //itemSelectedBg: "#414141d8", // dark background on active item
            //itemSelectedColor: "#C9A84C", // gold text on dark bg
          },
        },
      }}
    >
      <Layout>
        <div className="bg-white-bg sticky top-0 z-1000 ">
          <Header></Header>
          <Divider className="mb-2! mt-0! sm:my-6!" />
        </div>
        <Layout className="">
          <Routing />
        </Layout>
        <FooterCmp></FooterCmp>
      </Layout>
    </ConfigProvider>
  );
};

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes>
  );
}
export default MainDashboardEntry;
